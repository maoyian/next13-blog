import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

// 博客列表
export default async function handler(req, res) {
  let { db } = await connectToDatabase()

  const { method } = req
  const params = JSON.parse(req.body || '{}')
  console.log('method', method)
  console.log('params', params)
  switch (method) {
    case 'PUT': {
      const res = await db.collection('blogs').insert({
        imgUrl: 'https://oss.lixiaoxu.cn/halo/image-1677136471067.png',
        title: 'new',
        author: 'mm',
        headImg:
          'https://oss.lixiaoxu.cn/halo2//0e1c1845b0741107bd33f52429f93f82_1.jpg',
        priseCount: 19,
      })
      console.log('first', '-put', res)
      break
    }
    default: {
      const list = await db.collection('blogs').find().toArray()
      res.status(200).json({ list })
    }
  }
}
