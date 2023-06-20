import React, { useContext } from 'react'
import { GlobalContext } from '@/pages/_app'
export default function ToTop(props) {
  const {
    scroll: { scrollPercent },
  } = useContext(GlobalContext)
  console.log('props', props, scrollPercent)
  const toTop = () => {
    props.listRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const percent = scrollPercent * 2.51

  return (
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
          strokeDasharray={percent + ',251'}
        ></circle>
      </svg>
      <i
        onClick={toTop}
        className="fixed text-red-300 cursor-pointer select-none iconfont bottom-5 right-5"
      >
        &#xe652;
      </i>
    </>
  )
}
