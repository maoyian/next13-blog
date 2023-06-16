import '@/styles/tailwind.css'
import '@/styles/iconfont.css'
import '@/styles/css3.css'
import SeoHead from '@/components/SeoHead'
import Navbar from '@/components/navbar'
import React from 'react'
import ThemeContext from '@/components/ThemContext'
import GlobalContext from '@/utils/context'
import { SWRConfig } from 'swr'
import SearchBox from '@/components/SearchBox'
const myFetch = (url, method = 'GET', params = {}) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}
const parseQueryString = (url) => {
  var json = {}
  var arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach((item) => {
    let tmp = item.split('=')
    json[tmp[0]] = tmp[1]
  })
  return json
}
export default function MyApp({ Component }) {
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
          <GlobalContext>
            <ThemeContext>
              <Navbar />
              <div
                id="m-warp"
                className="box-border h-screen overflow-scroll dark:bg-slate-950 dark:text-white"
              >
                <SearchBox />
                <Component />
              </div>
            </ThemeContext>
          </GlobalContext>
        </SWRConfig>
      </div>
    </>
  )
}
