import React, { useEffect } from 'react'
import SideMenu from '../../components/sendNewsBox/SideMenu'
import TopHeader from '../../components/sendNewsBox/TopHeader'
import { Outlet, useLocation } from 'react-router-dom'
import './SendNewsBox.scss'
import { Layout } from 'antd'
import Nprogress from 'nprogress'
import { Spin } from 'antd'
import 'nprogress/nprogress.css'
import { connect } from 'react-redux'
const { Content } = Layout
function SendNewsBox(props) {
  console.log('SendNewsBox')
  const location = useLocation()
  // const element = useRoutes(routes)
  useEffect(() => {
    Nprogress.start()
    Nprogress.done()
  }, [location.pathname])
  return (
    <Layout style={{ height: '100vh' }}>
      <SideMenu></SideMenu>
      <Layout
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <TopHeader></TopHeader>
        <Spin wrapperClassName="spin" spinning={props.isLoading}>
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
        </Spin>
      </Layout>
    </Layout>
  )
}
const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
  return {
    isLoading,
  }
}
const mapDispatchToProps = {
  changeLoading() {
    return {
      type: 'change_loading',
    }
  },
}
export default connect(mapStateToProps)(SendNewsBox)
