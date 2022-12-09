import React, { useEffect } from 'react'
import SideMenu from '../../components/sendNewsBox/SideMenu'
import TopHeader from '../../components/sendNewsBox/TopHeader'
import { useRoutes, Outlet, useNavigate, useLocation } from 'react-router-dom'
// import routes from '../../router'
import './SendNewsBox.scss'
import { Layout } from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const { Content } = Layout
export default function SendNewsBox() {
  console.log('SendNewsBox')
  const location = useLocation()
  // const element = useRoutes(routes)
  useEffect(() => {
    Nprogress.start()
    Nprogress.done()
  }, [location.pathname])
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
