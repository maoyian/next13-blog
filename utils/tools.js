export const _throttle = (fn, limit = 60) => {
  let timer = null
  return () => {
    if (timer) return
    timer = setTimeout(() => {
      fn.call()
      timer = null
    }, limit)
  }
}
export const parseQueryString = (url) => {
  var json = {}
  var arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach((item) => {
    let tmp = item.split('=')
    json[tmp[0]] = tmp[1]
  })
  return json
}
// export const _throttle = (fn, interval = 60, options = {}) => {
//   let startTime = 0 // 设置一个计时器
//   let timer = null // leading默认值设置为true，trailing默认值设置为false
//   const { leading = true, trailing = true } = options

//   const _throttle = function (...args) {
//     let currentTime = new Date().getTime() // 不需要立即执行时，将初始值为0的startTime修改为当前时间

//     if (!leading && !startTime) {
//       startTime = currentTime
//     }
//     let restTime = interval - (currentTime - startTime)

//     if (restTime <= 0) {
//       // 当存在计时器时，清空计时器
//       if (timer) {
//         clearTimeout(timer)
//         timer = null
//       }
//       fn.apply(this, args)
//       startTime = currentTime // 执行完成就不再执行下面计时器的代码，避免重复执行
//       return
//     } // 如果需要最后一次执行

//     if (trailing && !timer) {
//       // 设置计时器
//       timer = setTimeout(() => {
//         timer = null
//         fn.apply(this, args) // 当需要立即执行时，开始时间赋值为当前时间，反之，赋值为0
//         startTime = !leading ? 0 : new Date().getTime()
//       }, restTime)
//     }
//   }
//   return _throttle
// }
