import React, { useEffect } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Dropdown, Layout, Avatar, Image, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import './TopHeader.scss'
import AvatarImg from '../../assets/avatar.gif'
import { getUserInfo } from '../../utils/common'
import {connect} from 'react-redux'
const { Header } = Layout
function TopHeader(props) {
  console.log('TopHeader',props)
  const userInfo = getUserInfo()
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const items = [
    { label: userInfo.role.roleName, key: 'item-1' }, // 菜单项务必填写 key
    {
      label: '退出登录',
      key: 'item-2',
      danger: true,
      onClick: () => {
        localStorage.clear()
        navigate('/login', { replace: true })
      },
    },
  ]
  const changeCollapsed = () => {
    props.changeCollapsed()
  }
  useEffect(() => {
    const openNotification = () => {
      api.open({
        message: '消息通知',
        description: `欢迎回来：${userInfo.username}`,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        duration: 2,
      })
    }
    openNotification()
  }, [api,userInfo.username])
  return (
    <>
      {contextHolder}
      <Header
        className="topHeader"
        style={{ padding: '0 24px', backgroundColor: 'white' }}
      >
        {props.isCollapsed ? (
          <MenuUnfoldOutlined onClick={changeCollapsed} />
        ) : (
          <MenuFoldOutlined onClick={changeCollapsed} />
        )}
        <Dropdown menu={{ items }}>
          <div className="user">
            <Avatar
              shape="square"
              size="large"
              style={{marginRight:'10px'}}
              src={<Image src={AvatarImg} preview={false} />}
            />
            <div>{userInfo.username}</div>
          </div>
        </Dropdown>
      </Header>
    </>
  )
}
const mapStateToProps = ({CollapsedReducer:{isCollapsed}} )=>{
  return {
    isCollapsed
  }
}
const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type:"change_collapsed"
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopHeader)