import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Dropdown, Layout, Avatar, Image, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import './TopHeader.scss'
import AvatarImg from '../../assets/avatar.gif'
const { Header } = Layout
export default function TopHeader() {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const [collapsed, setCollapsed] = useState(false)
  const items = [
    { label: '超级管理员', key: 'item-1' }, // 菜单项务必填写 key
    { label: '退出登录', key: 'item-2', danger: true,onClick:()=>{
      localStorage.removeItem('token')
      navigate('/login',{replace:true})
    } },
  ]
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const openNotification = () => {
    api.open({
      message: '消息通知',
      description: '欢迎回来：王大锤',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      duration: 2
    })
  }
  useEffect(() => {
    openNotification();
  }, [])
  return (
    <>
      {contextHolder}
      <Header
        className="topHeader"
        style={{ padding: '0 24px', backgroundColor: 'white' }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined onClick={changeCollapsed} />
        ) : (
          <MenuFoldOutlined onClick={changeCollapsed} />
        )}
        <Dropdown menu={{ items }}>
          <div className="user">
            欢迎回来
            <Avatar
              shape="square"
              size="large"
              src={<Image src={AvatarImg} preview={false} />}
            />
          </div>
        </Dropdown>
      </Header>
    </>
  )
}
