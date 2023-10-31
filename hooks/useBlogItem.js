import useSWR from 'swr'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { logger } from '@/middleware/logger'
function useBlogItem(id) {
  const headers = {}
  const { data, error, isLoading, mutate } = useSWR(
    `/api/blogs/${id}`,
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

export { useBlogItem }
