import React from 'react'
import { useEffect, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { _throttle } from '@/utils/tools'
import { GlobalContext } from '@/utils/context'
import List from '@/components/List'
export default function Index(props) {
  const {
    top: { isTop, setTop },
  } = useContext(GlobalContext)

  const listRef = useRef(null)
  const [scrollPercent, setScrollPercent] = useState(0)
  useEffect(() => {
    const mWarp = document.querySelector('#m-warp')
    const handleListScroll = (e) => {
      // const scrollHeight = window.document.documentElement.scrollHeight
      const scrollHeight = mWarp.scrollHeight
      const scrollTop = mWarp.scrollTop
      const documentHeight = mWarp.clientHeight
      setScrollPercent(
        (scrollTop / (scrollHeight - documentHeight)) * 100 * 2.51
      )
      setTop(!scrollTop)
      // console.log(scrollHeight, scrollTop, documentHeight)
    }
    mWarp.addEventListener('scroll', _throttle(handleListScroll))
    // 首次渲染触发
    handleListScroll()
    // cleanup
    return () => {
      mWarp.removeEventListener('scroll', handleListScroll)
    }
  })
  const percentString = (scrollPercent || 0) + ',' + 251

  const toTop = () => {
    listRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* 返回顶部按钮 */}
      {Boolean(scrollPercent) && (
        <>
          <svg
            className="fixed text-red-300 bottom-3 right-2"
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            width="40"
            viewBox="0 0 110 110"
          >
            {/* <circle
              cx="50%"
              cy="50%"
              r="40"
              strokeWidth="8"
              stroke="#fff"
              fill="none"
            ></circle> */}
            <circle
              cx="50%"
              cy="50%"
              r="40"
              strokeWidth="8"
              fill="none"
              stroke="currentColor"
              transform="rotate(-90 55 55)"
              strokeDasharray={percentString}
            ></circle>
          </svg>
          <i
            onClick={toTop}
            className="fixed text-red-300 cursor-pointer select-none iconfont bottom-5 right-5"
          >
            &#xe652;
          </i>
        </>
      )}
      <List ref={listRef} />
    </>
  )
}
