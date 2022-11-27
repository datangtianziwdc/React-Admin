import React from 'react'
import SideMenu from '../../components/sendNewsBox/SideMenu'
import TopHeader from '../../components/sendNewsBox/TopHeader'
import { useRoutes, Outlet } from 'react-router-dom'
import routes from '../../router'
import './SendNewsBox.scss'
import { Breadcrumb, Layout, Menu } from 'antd'
const { Header, Content, Sider } = Layout
export default function SendNewsBox() {
  const element = useRoutes(routes)
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            padding: 16,
            margin: '24px 16px',
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
