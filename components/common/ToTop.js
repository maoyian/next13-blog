import React, { useContext } from 'react'
import { GlobalContext } from '@/pages/_app'
export default function ToTop(props) {
  const {
    scroll: { scrollPercent },
    device: { isSafari },
  } = useContext(GlobalContext)
  const toTop = () => {
    props.listRef.current &&
      props.listRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  if (scrollPercent < 1) return <></>
  return (
    <>
      <svg
        style={{ bottom: isSafari ? 'calc(75px + 1rem)' : '1.25rem' }}
        className="fixed z-10 text-red-300 right-2"
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
          strokeDasharray={scrollPercent * 2.51 + ',251'}
        ></circle>
      </svg>
      <i
        style={{ bottom: isSafari ? 'calc(75px + 1.5rem)' : '1.75rem' }}
        onClick={toTop}
        className="fixed z-10 text-red-300 cursor-pointer select-none iconfont right-5"
      >
        &#xe652;
      </i>
    </>
  )
}
