import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import { enCode, deCode } from '@/utils/auth'
import { getQuery } from '@/utils/params'
// 博客列表 查询 新建 修改 删除
export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error('db error')
  }

  const { method } = req
  console.log(
    `请求方法<${req.method}>请求路径:<${req.url}>, body:<${req.body}>, params:<${req.params}>`
  )
  let params = null
  if (typeof req.body === 'object') {
    params = req.body
  } else {
    params = JSON.parse(req.body || '{}')
  }
  switch (method) {
    case 'GET': {
      const u = req.url.split('/api/blogs?')[1]
      const filter = getQuery(u) // 获取url上的查询参数
      const { keyword, order, sortBy, page, per_page, ...select } = filter
      console.log('keyword :>> ', keyword)
      if (keyword) {
        // 关键字查询
        select.title = keyword
      }

      // 排序
      const sortOption =
        sortBy && (order === 'des' || order === 'asc')
          ? {
              [sortBy]: order === 'asc' ? 1 : -1,
            }
          : {}
      // 分页
      const limitSize = per_page ? +per_page : Infinity
      const offset = page ? page * limitSize : 1
      // 查询
      const list = await db
        .collection('blogs')
        .find(select)
        .sort(sortOption)
        // .limit(limitSize)
        // .skip(offset)
        .toArray()
      const enCodeList = list.map((li) => {
        // 对_id加密
        return { ...li, _id: enCode(li._id) }
      })
      // 手动分页
      const start = (page - 1) * per_page || 0
      const end = page * per_page || Infinity
      console.log('start :>> ', start, end)
      res
        .status(200)
        .json({ list: enCodeList.slice(start, end), total: list.length })
      break
    }
    case 'POST': {
      // 设置基本信息
      !params.imgUrl
        ? (params.imgUrl =
            'https://oss.lixiaoxu.cn/halo/image-1677136471067.png')
        : ''
      !params.title ? (params.title = 'next入门到放弃') : ''
      !params.author ? (params.author = 'mm') : ''
      !params.headImg
        ? (params.headImg =
            'https://oss.lixiaoxu.cn/halo2//0e1c1845b0741107bd33f52429f93f82_1.jpg')
        : ''
      !params.priseCount ? (params.priseCount = 0) : ''

      const createTime = new Date().getTime()
      // 新建
      const { acknowledged } = await db
        .collection('blogs')
        .insertOne({ ...params, createTime })
      res.status(200).json({
        success: acknowledged,
      })
      break
    }
    case 'DELETE': {
      console.log('req :>> ', req)
      // 删除
      break
    }
    case 'PUT': {
      console.log('req :>> put', typeof params)
      // const createTime = new Date().getTime()
      // const { title, content, type } = params
      // const { acknowledged } = await db
      //   .collection('blogs')
      //   .insertOne({ title, content, createTime })
      // res.status(200).json({
      //   success: acknowledged,
      // })
      break
    }
    default: {
      console.log('default :>> ')
    }
  }
}
