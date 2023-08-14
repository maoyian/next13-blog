/**
 * fetcher默认配置
 *
 * */
import { defaultHeaders } from '@/configs/defaultHeaders'
export const fetcher = (config) => {
  const { method = 'GET', headers, params = {} } = config || {}

  const mergeHeaders = { ...defaultHeaders, ...headers }
  const option = { method, headers: mergeHeaders, body: JSON.stringify(params) }
  // GET / HEAD / DELETE 不支持body
  if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
    delete option.body
  }
  return async (url) => {
    const res = await fetch(url, option)

    console.log('res :>> ' + method, res)
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // 将额外的信息附加到错误对象上。
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  }
}
