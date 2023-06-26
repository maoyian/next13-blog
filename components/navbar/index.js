'use client'
import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeContext } from '../../context/ThemContext'
import { GlobalContext } from '@/pages/_app'
export default function Navbar() {
  const { toggleThemeHandler, isDarkTheme } = useContext(ThemeContext)
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    setIsDark(isDarkTheme)
  }, [isDarkTheme])

  const {
    scroll: { scrollPercent },
  } = useContext(GlobalContext)
  const {
    search: { isSearch, setSearch },
    menu: { isMenu, setMenu },
  } = useContext(GlobalContext)

  const handleShowMenu = () => {
    setMenu(true)
    // 移动端蒙层滚动问题
    // document.body.
    // document.querySelector('#m-warp').addEventListener('scroll', function (e) {
    //   e.preventDefault()
    // })
  }
  return (
    <>
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 text-2xl bg-white shadow-sm select-none h-14 dark:bg-slate-950 dark:bg-opacity-60 bg-white/30 backdrop-blur">
        {/* 首页 */}
        <Link href="/">
          <i className="z-10 text-red-400 iconfont">&#xe722;</i>
        </Link>
        <div className="flex items-center gap-2 text-red-300 ">
          {/* 灯光 */}

          <i
            onClick={toggleThemeHandler}
            className={`${
              isDark ? 'text-slate-100' : 'text-slate-900'
            } px-2 pulse iconfont hover:cursor-pointer hover:scale-125`}
          >
            &#xe633;
          </i>
          {/* 搜索 */}
          <i
            onClick={() => setSearch(!isSearch)}
            className="px-2 text-base pulse iconfont hover:cursor-pointer hover:scale-125"
          >
            &#xe61e;
          </i>
          {/* 菜单 */}
          <i
            onClick={handleShowMenu}
            className="px-2 pulse iconfont hover:cursor-pointer hover:scale-125"
          >
            &#xe6ec;
          </i>
        </div>
      </div>
    </>
  )
}
