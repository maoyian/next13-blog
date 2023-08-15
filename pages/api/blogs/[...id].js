import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import { enCode, deCode } from '@/utils/auth'
import { getQuery } from '@/utils/params'

// 博客列表 查询 新建 修改 删除
export default async function handler(req, res) {
  console.log(
    `请求方法<${req.method}>请求路径:<${req.url}>, body:<${req.body}>, params:<${req.params}>`
  )
  let id = req.url.split('/api/blogs/')[1]
  // 处理id可能是/开头的问题
  if (id.length === 43) {
    id = '/' + id
  }
  console.log('id--- :>> ', id)
  try {
    const deCodeId = deCode(id)
    console.log('deCodeId :>> ', deCodeId)
    const _id = new ObjectId(deCodeId)
    const { db } = await connectToDatabase()
    const { method } = req
    let params = null
    if (typeof req.body === 'object') {
      params = req.body
    } else {
      params = JSON.parse(req.body || '{}')
    }
    switch (method) {
      case 'GET': {
        const blogs = await db.collection('blogs').find({ _id }).toArray()
        res.status(200).json({
          blog: blogs[0],
        })
        break
      }
      case 'DELETE': {
        try {
          const { acknowledged, deletedCount } = await db
            .collection('blogs')
            .deleteMany({
              _id,
            })
          res.status(200).json({
            success: acknowledged,
            deletedCount,
          })
        } catch (error) {
          console.log('error :>> ', error)
        }
        // 删除
        break
      }
      case 'PUT': {
        // 修改完整资源
      }
      case 'PATCH': {
        // 修改单个资源
        const updateTime = new Date().getTime()
        const { action } = params
        const { filed, value } = action
        const operation = {
          [filed]: '',
          updateTime,
        }
        if (
          filed === 'viewCount' ||
          filed === 'priseCount' ||
          filed === 'commentCount'
        ) {
          const blog = await db.collection('blogs').findOne({
            _id: new ObjectId(deCodeId),
          })
          operation[filed] = blog[filed] + value
        } else {
          operation[filed] = value
        }
        const { acknowledged } = await db.collection('blogs').updateOne(
          {
            _id: new ObjectId(deCodeId),
          },
          {
            $set: operation,
          }
        )
        res.status(200).json({
          success: acknowledged,
        })
        break
      }
      default: {
        console.log('default :>> ')
      }
    }
  } catch (error) {
    console.log('error -g :>> ', error)
    res.status(200).json({
      success: false,
    })
  }
}
