import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Dropdown, Layout, Avatar, Menu, Image } from 'antd'
import './TopHeader.scss'
import AvatarImg from '../../assets/avatar.gif'
const { Header, Content, Sider } = Layout
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))
const items = [
  { label: '超级管理员', key: 'item-1' }, // 菜单项务必填写 key
  { label: '退出登录', key: 'item-2', danger: true },
]
export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
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
  )
}
