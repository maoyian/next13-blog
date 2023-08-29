//URLSearchParams
// 把对象以字符串方式拼接在地址后面
export const setQuery = (queryObj = {}) => {
  return Object.keys(queryObj).length ? `?${new URLSearchParams(queryObj)}` : ''
}

export const getQuery = (queryStr = '') => {
  const u = new URLSearchParams(queryStr)
  const iterator = u.entries()
  const json = {}
  if (iterator) {
    for (let arr of iterator) {
      let k = arr[0]
      let v = arr[1]
      json[k] = v
    }
  }
  return json
}

// export const getParams = (queryStr = '') => {
//   const json = {}
//   const arr = queryStr.substr(queryStr.indexOf('?') + 1).split('&')
//   arr.forEach((item) => {
//     let tmp = item.split('=')
//     json[tmp[0]] = tmp[1]
//   })
//   return json
// }
