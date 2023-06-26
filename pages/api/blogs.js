import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

// 博客列表
export default async function handler(req, res) {
  let { db } = await connectToDatabase()
  const blogs = await db.collection('blogs').find().toArray()

  res.status(200).json({ blogs })
}
