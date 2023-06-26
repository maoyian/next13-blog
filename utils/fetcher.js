/**
 * GET 或 HEAD 方法的请求不能包含 body 信息。
 *
 * */
export const fetcher = (config) => {
  const { method = 'GET', headers = {}, params = {} } = config
  const option = { method, headers, body: JSON.stringify(params) }
  // GET / HEAD 不支持body
  if (method === 'GET' || method === 'HEAD') {
    delete option.body
  }
  return (url) => fetch(url, option).then((res) => res.json())
}
