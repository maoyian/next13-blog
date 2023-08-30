import useSWR from 'swr'
// import { fetcher } from '@/configs/fetcher'
// import { setQuery } from '@/utils/params'
// import { logger } from '@/middleware/logger'
// function useBlogList(filter = {}) {
//   const headers = {
//     sortField: 'createTime',
//     sortOrder: 'des',
//   }
//   const query = setQuery(filter)
//   const { data, error, isLoading, mutate } = useSWR(
//     `/api/blogs${query}`,
//     fetcher({ method: 'GET', headers }),
//     { use: [logger] }
//   )
//   return {
//     data,
//     isLoading,
//     error,
//     mutate,
//   }
// }

// export { useBlogList }

import useSWRInfinite from 'swr/infinite'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { logger } from '@/middleware/logger'
function useBlogList(filter = {}) {
  const headers = {
    sortField: 'createTime',
    sortOrder: 'des',
  }
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(
      (index) => {
        filter.page = index + 1
        console.log('index :>> ', index)
        console.log('filter.page :>> ', filter.page)
        const query = setQuery(filter)
        return `/api/blogs${query}`
      },
      fetcher({ method: 'GET', headers })
      // { use: [logger] }
    )
  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
    size,
    setSize,
  }
}

export { useBlogList }
