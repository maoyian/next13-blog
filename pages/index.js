import React from 'react'
import { useRef } from 'react'
import BlogList from '@/components/BlogList'
import ToTop from '@/components/ToTop'
export default function Index(props) {
  // const percentString = (1 || 0) + ',' + 251
  const listRef = useRef(null)
  return (
    <>
      {/* 返回顶部按钮 */}
      <ToTop listRef={listRef} />

      <BlogList ref={listRef} />
    </>
  )
}
