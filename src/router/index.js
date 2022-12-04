import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import SendNewsBox from '../views/sendNewsBox/SendNewsBox'
import Home from '../views/sendNewsBox/home/Home'
import RightList from '../views/sendNewsBox/rightList/RightList'
import RoleList from '../views/sendNewsBox/roleList/RoleList'
import UserList from '../views/sendNewsBox/user-manage/UserList'
import NoPremission from '../views/sendNewsBox/noPremission/NoPremission'
import { getToken } from '../utils/common'
// RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
function RequireAuth({ children }) {
  console.log('children', children)
  const authed = getToken()

  return authed.length > 0 ? ( // 判断 localstorage 中登录状态是否为 true
    children
  ) : (
    <Navigate to="/login" replace /> // 跳转到登录
  )
}
const routes = [
  {
    path: '/*',
    element: (
      <RequireAuth>
        <SendNewsBox />
      </RequireAuth>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'right-manage/right/list',
        element: <RightList />,
      },
      {
        path: 'right-manage/role/list',
        element: <RoleList />,
      },
      {
        path: 'user-manage/list',
        element: <UserList />,
      },
      {
        path: '*',
        element: <NoPremission />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]
export default routes
