import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import { enCode, deCode } from '@/utils/auth'
import { getQuery } from '@/utils/params'
// 博客列表 查询 新建 修改 删除
export default async function handler(req, res) {
  const { db } = await connectToDatabase()
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
      const order = JSON.parse(req.headers.order)
      order.createTime = +order.createTime
      // 查询
      const list = await db
        .collection('blogs')
        .find(filter)
        .sort(order)
        .toArray()
      // 对_id加密
      const enCodeList = list.map((li) => {
        return { ...li, _id: enCode(li._id) }
      })
      res.status(200).json({ list: enCodeList })
      break
    }
    case 'POST': {
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
    default: {
      console.log('default :>> ')
    }
  }
}
