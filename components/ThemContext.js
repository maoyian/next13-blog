import { createContext, useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleThemeHandler: () => {},
})
export default function ThemeContextProvider(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const initialThemeHandler = useCallback(() => {
    const themeCookie = Cookies.get('theme')
    setIsDarkTheme(themeCookie === 'dark')
    if (themeCookie) {
      document
        .querySelector('html')
        ?.classList.remove(isDarkTheme ? 'dark' : 'light')
      document.querySelector('html')?.classList.add(themeCookie)
    } else {
      const date = new Date()
      const expires = new Date(date.setMonth(date.getMonth() + 1))
      Cookies.set('theme', 'light', {
        secure: true,
        expires: expires,
      })
    }
  }, [isDarkTheme])
  useEffect(() => initialThemeHandler(), [initialThemeHandler])

  const toggleThemeHandler = () => {
    const themeCookie = Cookies.get('theme')
    setIsDarkTheme((ps) => !ps)
    const date = new Date()
    const expires = new Date(date.setMonth(date.getMonth() + 1))
    Cookies.set('theme', themeCookie !== 'dark' ? 'dark' : 'light', {
      secure: true,
      expires: expires,
    })
    toggleDarkClassToBody()
    console.log('toggle')
  }

  const toggleDarkClassToBody = () => {
    document
      .querySelector('html')
      ?.classList.remove(isDarkTheme ? 'dark' : 'light')
    document
      .querySelector('html')
      ?.classList.add(!isDarkTheme ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
