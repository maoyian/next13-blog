import { createContext, useState } from 'react'

export const GlobalContext = createContext()

export default function ContextProvider(props) {
  const [isTop, setTop] = useState(false)
  const [isSearch, setSearch] = useState(false)
  return (
    <GlobalContext.Provider
      value={{ top: { isTop, setTop }, search: { isSearch, setSearch } }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
