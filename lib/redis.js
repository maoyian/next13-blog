// import Redis from 'ioredis'
// const redis = new Redis()

// const setRedis = (k, v) => {
//   if (typeof v === 'object') {
//     redis.set(k, JSON.stringify(v))
//   } else {
//     redis.set(k, v)
//   }
// }
// const getRedis = (k) => {
//   const v = redis.get(k)
//   if (v === '[object Object]') {
//     return JSON.parse(v)
//   } else {
//     return v
//   }
// }
// export { redis, setRedis, getRedis }
