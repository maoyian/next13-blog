import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null
let client = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  client = new MongoClient(MONGODB_URI, opts)
  // set cache
  cachedClient = client
  try {
    // Connect to cluster
    await client.connect()
    const db = client.db(MONGODB_DB)
    cachedDb = db
    console.log('数据库连接成功 :>> ')
    return {
      client: cachedClient,
      db: cachedDb,
    }
  } catch (error) {
    console.error('数据库连接失败 :>> ', error)
    connectToDatabase()
      .then(() => {
        console.log('已自动重新连接')
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

// 在启动时尝试重新连接
connectToDatabase()
  .then(() => {
    console.log('启动时自动连接')
  })
  .catch((error) => {
    console.error('启动时自动连接失败', error)
  })
