const userInfo = {
  nickName: 'mm',
  email: 'email',
  password: '123',
}
const _delay = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
// const _getUserInfo = async () => {
//   await _delay()
//   return userInfo
// }
export default async function handler(req, res) {
  await _delay()
  const { method } = req
  console.log(method, req.params, req.query, req.body)
  if (method === 'GET') {
    res.status(200).json(userInfo)
  }
  if (method === 'PUT') {
    // const { nickName } = JSON.parse(req.body)
    const params = JSON.parse(req.body)
    console.log(typeof params)
    // userInfo = { ...userInfo, ...params }
    res.status(200).json(userInfo)
  }
}
