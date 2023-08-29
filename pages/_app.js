import '@/styles/tailwind.css'
import '@/styles/iconfont.css'
import '@/styles/css3.css'
import '@/styles/common.css'
import '@/styles/game.css'

import SeoHead from '@/components/common/SeoHead'
import Navbar from '@/components/navbar'
import React, { useState, useEffect, createContext, useRef } from 'react'
import ThemeContext from '@/context/ThemContext'
import { SWRConfig } from 'swr'
import SearchBox from '@/components/SearchBox'
import PopMenu from '@/components/menu/PopMenu'
import { _throttle } from '@/utils/tools'

export const myFetch = (url, method = 'GET', params = {}) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
export const GlobalContext = createContext()
export default function MyApp({ Component }) {
  const [isSearch, setSearch] = useState(false)
  const [isMenu, setMenu] = useState(false)
  const mWarpRef = useRef(null)
  const [isSafari, setSafari] = useState(false)

  /**
   * m-warp发生滚动时计算滚动百分比
   */
  const [scrollPercent, setScrollPercent] = useState(0)
  const handleListScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = mWarpRef.current
    setScrollPercent((scrollTop / (scrollHeight - clientHeight)) * 100)
  }
  useEffect(() => {
    /**
     * 对移动端ios上safari底部工具栏的兼容
     */
    const mobile = () => {
      let isSafari = false
      const ua = navigator.userAgent.toLowerCase()
      if (
        ua.indexOf('applewebkit') > -1 &&
        ua.indexOf('mobile') > -1 &&
        ua.indexOf('safari') > -1 &&
        ua.indexOf('linux') === -1 &&
        ua.indexOf('android') === -1 &&
        ua.indexOf('chrome') === -1 &&
        ua.indexOf('ios') === -1 &&
        ua.indexOf('browser') === -1
      ) {
        isSafari = true
      }
      setSafari(isSafari)
    }
    mobile()
    window.addEventListener('resize', mobile)
    return () => {
      window.removeEventListener('resize')
    }
  }, [])
  return (
    <>
      <ThemeContext>
        <div
          style={{ height: isSafari ? 'calc(100vh - 105px)' : '100vh' }}
          className="box-border overflow-hidden bg-slate-50"
        >
          <SWRConfig
            value={{
              // 全局配置
              refreshInterval: 0, // 多少ms刷新一次请求 0不刷新
            }}
          >
            <SeoHead name="博客" content="博客描述" />
            <GlobalContext.Provider
              value={{
                search: { isSearch, setSearch },
                menu: { isMenu, setMenu },
                device: { isSafari },
                scroll: {
                  scrollPercent,
                  setScrollPercent,
                },
              }}
            >
              <Navbar />
              <div
                ref={mWarpRef}
                onScrollCapture={_throttle(handleListScroll)}
                id="m-warp"
                style={{ height: isSafari ? 'calc(100vh - 105px)' : '100vh' }}
                className="box-border py-2 pt-16 overflow-y-auto scroll-pt-16 dark:bg-slate-950 dark:text-white"
              >
                <SearchBox />
                <PopMenu />
                <Component />
              </div>
            </GlobalContext.Provider>
          </SWRConfig>
        </div>
      </ThemeContext>
    </>
  )
}
