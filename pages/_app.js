import '@/styles/tailwind.css'
import '@/styles/iconfont.css'
import '@/styles/css3.css'
import SeoHead from '@/components/common/SeoHead'
import Navbar from '@/components/navbar'
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
  useCallback,
} from 'react'
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

  /**
   * 页面滚动百分百
   */
  const [scrollPercent, setScrollPercent] = useState(0)
  const handleListScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = mWarpRef.current
    setScrollPercent((scrollTop / (scrollHeight - clientHeight)) * 100)
    console.log(scrollPercent, 'scrollPercent')
  }
  useEffect(() => {
    /**
     * 对不同设备的页面兼容
     */
    const mWarp = document.querySelector('#m-warp')
    const mobile = () => {
      const info = navigator.userAgent
      const DEVICE = info.includes('iPhone')
        ? 'iphone'
        : info.includes('Android')
        ? 'Android'
        : 'Pc'
      DEVICE === 'iphone' && mWarp.classList.add('pb-32')
      console.log('device', DEVICE)
    }
    window.addEventListener('resize', mobile)
    return () => {
      window.removeEventListener('resize')
    }
  }, [])
  return (
    <>
      <div className="h-screen overflow-hidden bg-slate-50">
        <SWRConfig
          value={{
            // 全局配置
            refreshInterval: 0, // 多少ms刷新一次请求 0不刷新
            // fetcher: (url, init) => {
            //   fetch(url, init).then((res) => res.json())
            // },
            // fetcher: myFetch,
          }}
        >
          <SeoHead name="博客" content="博客描述" />
          <GlobalContext.Provider
            value={{
              search: { isSearch, setSearch },
              menu: { isMenu, setMenu },
              scroll: {
                scrollPercent,
                setScrollPercent,
              },
            }}
          >
            <ThemeContext>
              <Navbar />
              <div
                ref={mWarpRef}
                onScrollCapture={_throttle(handleListScroll)}
                id="m-warp"
                className="box-border h-screen py-2 pt-16 overflow-y-auto scroll-pt-16 dark:bg-slate-950 dark:text-white"
              >
                <SearchBox />
                <PopMenu />
                <Component />
              </div>
            </ThemeContext>
          </GlobalContext.Provider>
        </SWRConfig>
      </div>
    </>
  )
}
