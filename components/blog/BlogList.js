import React from 'react'
import { forwardRef, useEffect } from 'react'
import BlogItem from './BlogItem'
import useSWR from 'swr'
import Loading from '../common/Loading'
// const fetcher = () => (url) => fetch(url).then((res) => res.json())
import { fetcher } from '@/utils/fetcher'
function BlogList(props, ref) {
  const { data, error, isLoading } = useSWR(
    '/api/blogs',
    fetcher({ method: 'GET' })
  )
  const handleAdd = () => {
    console.log('add')
    fetcher({ method: 'PUT', params: { name: 'm1' } })('/api/blogs')
  }
  useEffect(() => {
    handleAdd()
  }, [])

  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading />
  if (!data) return null
  const { list: blogs } = data

  return (
    <div
      ref={ref}
      className={`blog-list blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      <button onClick={handleAdd}>add</button>
      {blogs && blogs.map((blog) => <BlogItem key={blog._id} info={blog} />)}
      {blogs.length === 0 && 'empty'}
      {/* <BlogItem /> */}
    </div>
  )
}
export default forwardRef(BlogList)
