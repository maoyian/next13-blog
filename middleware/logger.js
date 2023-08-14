export const logger = (useSWRNext) => {
  return (key, fetcher, config) => {
    // 将日志记录器添加到原始 fetcher。
    const extendedFetcher = (...args) => {
      console.log('SWR Request:', key, config)
      return fetcher(...args)
    }

    // 使用新的 fetcher 执行 hook。
    return useSWRNext(key, extendedFetcher, config)
  }
}
