import React from 'react'
import { useRouter } from 'next/router'
import { forwardRef, useContext } from 'react'
import { GlobalContext } from '@/pages/_app'
import BlogItem from './BlogItem'
function BlogList(props, ref) {
  const router = useRouter()
  const {
    scroll: { scrollPercent },
  } = useContext(GlobalContext)
  console.log('li', scrollPercent)
  return (
    <div
      ref={ref}
      className={`blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <button
        className="px-4 py-2 rounded bg-sky-300 text-slate-50"
        onClick={() => router.push('/about')}
      >
        about
      </button>
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
    </div>
  )
}
export default forwardRef(BlogList)
