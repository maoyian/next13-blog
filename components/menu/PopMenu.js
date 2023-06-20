import { useContext, useRef, useEffect, useState } from 'react'
import { GlobalContext } from '@/pages/_app'
export default function PopMenu() {
  const popMenuRef = useRef(null)
  const {
    menu: { isMenu, setMenu },
  } = useContext(GlobalContext)
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
  useEffect(() => {
    // 根据设备来加padding
    const info = navigator.userAgent
    const DEVICE = info.includes('iPhone')
      ? 'iphone'
      : info.includes('Android')
      ? 'Android'
      : 'Pc'

    DEVICE === 'iphone' &&
      popMenuRef.current &&
      popMenuRef.current.classList.add('pb-12')
    console.log('device1', popMenuRef)
  }, [])
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
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
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
    {
      id: Math.random(),
      name: '菜单一',
      linkUrl: '',
      subMenu: [{ id: Math.random(), name: '菜单一_1', linkUrl: '' }],
    },
    { id: Math.random(), name: '菜单二', linkUrl: '', subMenu: null },
  ])

  return (
    <>
      {isMenu && (
        <div
          className="fixed top-0 bottom-0 right-0 flex bg-opacity-75 searchBox left-2 bg-slate-500"
          onClick={() => setMenu(false)}
        >
          <div
            onClick={stopBubble}
            className="w-64 p-2 bg-white dark:bg-slate-950 left-2 right-2 top-16 text-slate-500"
          >
            {/* 菜单 */}
            <ul ref={popMenuRef} className="h-screen p-2 overflow-auto">
              {menuList &&
                menuList.map((menu) => (
                  <>
                    <li
                      key={menu.id}
                      className="flex items-center justify-between p-2 mb-2 rounded bg-slate-200 dark:bg-slate-800"
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
                        <>
                          <ul
                            key={subMenu.id}
                            className={
                              menu.showSub ? 'block showMenu' : 'hidden'
                            }
                          >
                            <li
                              className="flex items-center justify-between p-2 mb-2 rounded bg-slate-200 dark:bg-slate-800"
                              onClick={() => handleSwitchMenu(subMenu)}
                            >
                              <div>{subMenu.name}</div>
                            </li>
                          </ul>
                        </>
                      ))}
                  </>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
