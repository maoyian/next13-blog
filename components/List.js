import React from 'react'
import { useRouter } from 'next/router'
import { forwardRef, useContext } from 'react'
import { GlobalContext } from '@/utils/context'
import BlogItem from './BlogItem'
function List(props, ref) {
  const { isTop } = useContext(GlobalContext)
  const router = useRouter()
  return (
    <div
      ref={ref}
      className={`${
        !isTop ? 'pt-8' : ''
      } px-2 dark:bg-slate-950 dark:text-white`}
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
export default forwardRef(List)
