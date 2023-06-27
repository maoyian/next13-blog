import React, { useContext, useRef, useEffect, useState } from 'react'
import { GlobalContext } from '@/pages/_app'
export default function PopMenu() {
  const popMenuRef = useRef(null)
  const {
    menu: { isMenu, setMenu },
    device: { isSafari },
  } = useContext(GlobalContext)

  /**
   *处理移动端蒙层下的滚动问题
   */
  useEffect(() => {
    const mWarp = document.querySelector('#m-warp')
    if (isMenu) {
      mWarp.style.overflow = 'hidden'
    } else {
      mWarp.style.overflow = 'scroll'
    }
  }, [isMenu])

  //   阻止事件冒泡
  const stopBubble = (e) => {
    e.stopPropagation()
  }

  const handleSwitchMenu = (item) => {
    if (item.subMenu) {
      item.showSub = !item.showSub
      setMenuList([...menuList])
    }
    console.log(item)
  }
  const [menuList, setMenuList] = useState([
    {
      id: Math.random(),
      name: '菜单一',
      linkUrl: '',
      subMenu: [{ id: Math.random(), name: '菜单一_1', linkUrl: '' }],
    },
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
    {
      id: Math.random(),
      name: '菜单一',
      linkUrl: '',
      subMenu: [{ id: Math.random(), name: '菜单一_1', linkUrl: '' }],
    },
  ])
  console.log('menuList', menuList)

  return (
    <>
      {isMenu && (
        <div
          className="fixed bottom-0 right-0 flex bg-opacity-75 top-14 searchBox left-2 bg-slate-500 text-slate-500"
          onClick={() => setMenu(false)}
        >
          {/* 菜单 */}

          <ul
            id="ul"
            style={{
              height: isSafari
                ? 'calc(100vh - 105px - 3.5rem)'
                : 'calc(100vh - 3.5rem)',
            }}
            onClick={stopBubble}
            ref={popMenuRef}
            className="w-64 p-2 overflow-auto bg-white dark:bg-slate-950"
          >
            {menuList &&
              menuList.map((menu) => (
                <React.Fragment key={menu.id}>
                  <li
                    className="flex items-center justify-between p-2 mb-2 rounded cursor-pointer bg-slate-200 dark:bg-slate-800"
                    onClick={() => handleSwitchMenu(menu)}
                  >
                    <div>{menu.name}</div>
                    {menu.subMenu && (
                      <i
                        className={`iconfont ${
                          menu.showSub ? 'origin-center rotate-90 ' : ''
                        }`}
                      >
                        &#xe840;
                      </i>
                    )}
                  </li>
                  {/* 子菜单 */}
                  {menu.subMenu &&
                    menu.subMenu.map((subMenu) => (
                      <li
                        key={subMenu.id}
                        className={`flex ${
                          menu.showSub ? 'block showMenu' : 'hidden'
                        } items-center justify-between p-2 mb-2 rounded bg-slate-200 dark:bg-slate-800`}
                        onClick={() => handleSwitchMenu(subMenu)}
                      >
                        <div>{subMenu.name}</div>
                      </li>
                    ))}
                </React.Fragment>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}
