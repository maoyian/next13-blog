import useSWR from 'swr'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { logger } from '@/middleware/logger'
function useBlogList(filter = {}) {
  const headers = {
    sortField: 'createTime',
    sortOrder: 'des',
  }
  const query = setQuery(filter)
  const { data, error, isLoading, mutate } = useSWR(
    `/api/blogs${query}`,
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
