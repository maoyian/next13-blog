import { useContext } from 'react'
import { GlobalContext } from '@/pages/_app'

export default function SearchBox() {
  const {
    search: { isSearch, setSearch },
  } = useContext(GlobalContext)
  const handleGoSearchItem = (e) => {
    setSearch(!isSearch)
  }
  const hideSearch = (e) => {
    setSearch(!isSearch)
  }
  //   阻止事件冒泡
  const stopBubble = (e) => {
    e.stopPropagation()
  }
  const searchResult = [
    // {
    //   title: '文章title',
    //   content: '部分截取内容',
    //   linkUrl: '', // 链接地址
    //   id: Math.random(),
    // },
  ]
  return (
    <>
      {isSearch && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 flex p-2 bg-opacity-75 searchBox bg-slate-500"
          onClick={hideSearch}
        >
          <div
            onClick={stopBubble}
            className="absolute p-2 m-auto bg-white divide-y rounded dark:bg-slate-950 dark:divide-slate-500 left-2 right-2 top-16 divide-slate-200 text-slate-500"
          >
            {/* 搜索框 */}
            <input
              className="w-full p-2 mb-2 rounded outline-none dark:bg-slate-800 dark:text-slate-100 "
              placeholder="输入关键词搜索"
              type="text"
              //   maxLength={20}
            />
            {/* 搜索结果 */}
            <ul className="max-h-[80vh] overflow-auto">
              {searchResult && searchResult.length ? (
                searchResult.map(({ id, title, content, linkUrl }) => (
                  <Item
                    key={id}
                    title={title}
                    content={content}
                    linkUrl={linkUrl}
                    handleGoSearchItem={handleGoSearchItem}
                  />
                ))
              ) : (
                <>
                  <Empty />
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
export const Item = ({ linkUrl, title, content, handleGoSearchItem }) => {
  return (
    <>
      <li
        onClick={() => handleGoSearchItem(linkUrl)}
        className="py-2 mb-1 rounded bg-gray-50 dark:bg-slate-800 "
      >
        <div className="px-2 text-sm font-medium truncate text-slate-800 dark:text-gray-50">
          {title}
        </div>
        <div className="px-2 text-sm font-thin leading-4 text-gray-600 break-all dark:text-gray-100">
          {content}
        </div>
      </li>
    </>
  )
}
export const Empty = () => (
  <li className="p-2 text-center text-slate-600 dark:text-gray-100">
    没有搜索结果
  </li>
)
