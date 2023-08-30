import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let client = null
let cachedDb = null
let cachedClient

export async function connectToDatabase() {
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  if (cachedDb && cachedClient) {
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }
  client = new MongoClient(MONGODB_URI, opts)
  cachedClient = client
  // set cache
  try {
    await client.connect()
    const db = client.db(MONGODB_DB)
    cachedDb = db
    console.log('数据库连接成功 :>> ')
    return {
      client,
      db,
    }
  } catch (error) {
    console.error('数据库连接失败 :>> gg', error)
    cachedClient = null
    cachedDb = null
    connectToDatabase()
      .then((res) => {
        console.log('已自动重新连接', res)
      })
      .catch((error) => {
        console.error('自动重新连接失败:', error)
      })
  }
}

// 在应用关闭时断开连接
process.on('SIGINT', async () => {
  console.log('Application shutting down...')
  await client.close()
  console.log('Connection closed.')
  process.exit()
})
