export const _throttle = (fn, delay = 60) => {
  let timer = null
  return () => {
    if (timer) return
    timer = setTimeout(() => {
      fn.call()
      timer = null
    }, delay)
  }
}
