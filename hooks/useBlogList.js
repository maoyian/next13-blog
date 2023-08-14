import useSWR from 'swr'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { logger } from '@/middleware/logger'
function useBlogList(filter = {}) {
  //   filter = {
  //     a: 10,
  //     b: 2,
  //   }
  const headers = {
    order: JSON.stringify({
      createTime: -1,
    }),
  }
  const { data, error, isLoading, mutate } = useSWR(
    `/api/blogs?${setQuery(filter)}`,
    fetcher({ method: 'GET', headers }),
    { use: [logger] }
  )
  return {
    data,
    isLoading,
    error,
    mutate,
  }
}

export { useBlogList }
