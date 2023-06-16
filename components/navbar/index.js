import React, { useContext } from 'react'
import Link from 'next/link'
import { ThemeContext } from '../ThemContext'
import { GlobalContext } from '@/utils/context'
export default function Navbar() {
  const { toggleThemeHandler, isDarkTheme } = useContext(ThemeContext)
  const {
    top: { isTop, setTop },
    search: { isSearch, setSearch },
  } = useContext(GlobalContext)
  console.log(isTop, isDarkTheme, isSearch, setSearch, 'istop')
  return (
    <>
      {/* <i className="fixed top-0 right-0 z-10 text-2xl left-8 dark:text-slate-100 text-slate-400 bounceOutRight iconfont">
        &#xe8d2;
      </i> */}
      <div
        className={`dark:bg-slate-950  backdrop-blur-sm shadow-sm bg-white ${
          isTop ? 'relative ' : 'fixed dark:bg-opacity-60'
        } top-0 left-0
            select-none right-0 flex items-center justify-between p-2 text-2xl bg-white bg-white/30 backdrop-blur`}
      >
        <Link href="/">
          <i className="z-10 text-red-400 iconfont">&#xe722;</i>
        </Link>
        <div className="flex items-center gap-2 text-red-300 ">
          {/* <i className="absolute iconfont hinge">&#xe6ed;</i> */}
          <i
            onClick={toggleThemeHandler}
            className={`${
              isDarkTheme ? 'text-slate-100' : 'text-slate-900'
            } px-2 pulse iconfont hover:cursor-pointer hover:scale-125`}
          >
            &#xe633;
          </i>
          <i
            onClick={() => setSearch(!isSearch)}
            className="px-2 text-base pulse iconfont hover:cursor-pointer hover:scale-125"
          >
            &#xe61e;
          </i>
          <i className="px-2 pulse iconfont hover:cursor-pointer hover:scale-125">
            &#xe6ec;
          </i>
        </div>
      </div>
    </>
  )
}
