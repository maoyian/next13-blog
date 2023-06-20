import React from 'react'
import { useRouter } from 'next/router'
import { forwardRef, useContext } from 'react'
import { GlobalContext } from '@/pages/_app'
import BlogItem from './BlogItem'
import useSWR from 'swr'
import Loading from '../common/Loading'
const fetcher = (url) => fetch(url).then((res) => res.json())
function BlogList(props, ref) {
  const { data, error, isLoading } = useSWR('/api/blogs', fetcher)
  const router = useRouter()
  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading />
  if (!data) return null
  console.log(data, 'ddd')
  const { blogs } = data
  return (
    <div
      ref={ref}
      className={`blog-list blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      {blogs && blogs.map((blog) => <BlogItem key={blog._id} info={blog} />)}
    </div>
  )
}
export default forwardRef(BlogList)
