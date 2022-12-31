import React, { useEffect, useState } from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { delObjByKey, getUserInfo } from '../../utils/common'
import './SideMenu.scss'
import { routerMap } from './routerMap'
const { Sider } = Layout
const iconMap = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserOutlined />,
  '/right-manage': <LaptopOutlined />,
  '/news-manage': <NotificationOutlined />,
  '/audit-manage': <AppstoreOutlined />,
  '/publish-manage': <CloudUploadOutlined />,
}
export default function SideMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const [defaultSelectedKeys,setDefaultSelectedKeys] = useState([])
  const [defaultOpenKeys,setDefaultOpenKeys] = useState(['/' + location.pathname.split('/')[1]])
  const [openKeys,setOpenKeys] = useState(['/' + location.pathname.split('/')[1]])
  const [menus, setMenu] = useState([])
  const {
    role: { rights },
  } = getUserInfo()
  useEffect(() => {
    // ant-menu-submenu-active ant-menu-submenu-selected
    const getData = async () => {
      const { data } = await axios.get('/rights?_embed=children')
      const routes = data
        .filter((item) => item.pagepermisson === 1 && rights.includes(item.key))
        .map((item) => {
          if (item.children.length === 0) {
            return {
              ...delObjByKey(item, 'children'),
              icon: iconMap[item.key],
              onClick: (e) => {
                console.log('onClick', e)
                navigate(e.key)
              },
            }
          } else {
            return {
              ...item,
              icon: iconMap[item.key],
              onClick: (e) => {
                console.log('onClick', e)
                navigate(e.key)
              },
            }
          }
        })
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: item.children
                ?.filter(
                  (e) => e.pagepermisson === 1 && rights.includes(item.key)
                )
                .map((e) => delObjByKey(e, 'rightId')),
              onClick: (e) => {
                console.log('onClick', e)
                navigate(e.key)
              },
            }
          } else {
            return {
              ...item,
              onClick: (e) => {
                console.log('onClick', e)
                navigate(e.key)
              },
            }
          }
        })
      console.log('routes', routes)
      setMenu(routes)
    }
    getData()
    setTimeout(() => {
      setClass()
    }, 200)
  }, [])
  // 用来解决antd刷新时默认展开的menu缺少class的bug
  const setClass = () => {
    const openDom = document.querySelectorAll('.ant-menu-submenu-open')[0]
    if (openDom) {
      openDom.className =
        'ant-menu-submenu ant-menu-submenu-inline ant-menu-submenu-open ant-menu-submenu-active ant-menu-submenu-selected'
    }
  }
  const onOpenChange = (openKeys)=>{
    console.log("onOpenChange回调",openKeys)
    setOpenKeys(openKeys)
  }
  useEffect(()=>{
    setDefaultOpenKeys(['/' + location.pathname.split('/')[1]])
    setDefaultSelectedKeys([location.pathname])
    console.log("openKeys",['/' + location.pathname.split('/')[1]])
    setOpenKeys([...openKeys,'/' + location.pathname.split('/')[1]])
  },[location.pathname])
  return (
    <Sider width={200} className="site-layout-background">
      <div className="flex-col">
        <div className="logo">全球新闻发布</div>
        <div className="slider">
          <Menu
            mode="inline"
            selectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            openKeys={openKeys}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
            onOpenChange={onOpenChange}
          />
        </div>
      </div>
    </Sider>
  )
}
