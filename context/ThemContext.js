import { createContext, useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const ThemeContext = createContext()
const themeKey = 'theme-mode'
export default function ThemeContextProvider(props) {
  // 初始为light
  const initialTheme = Cookies.get(themeKey) === 'dark' ? true : false
  const [isDarkTheme, setIsDarkTheme] = useState(initialTheme)
  /**
 * 默认light
 * 从cookie里面取 Cookies.get('themeKey')
 * 切换时更新cookie  
 *  const expires = new Date(date.setMonth(date.getMonth() + 1))
 *  Cookies.set('themeKey', 
 *    {secure: true,
      expires: expires,})
 */
  useEffect(() => {
    const toggleDarkClassToBody = () => {
      document
        .querySelector('html')
        ?.classList.remove(!isDarkTheme ? 'dark' : 'light')
      document
        .querySelector('html')
        ?.classList.add(isDarkTheme ? 'dark' : 'light')
    }
    console.log('toggle', isDarkTheme ? 'dark' : '')
    const date = new Date()
    const expires = new Date(date.setMonth(date.getMonth() + 1))
    Cookies.set(themeKey, isDarkTheme ? 'dark' : '', {
      secure: true,
      expires: expires,
    })
    toggleDarkClassToBody()
  }, [isDarkTheme])

  const toggleThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${isDarkTheme ? 'rgb(2 6 23)' : 'white'};
        }
      `}</style>
      <ThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  )
}
