import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import SendNewsBox from '../views/sendNewsBox/SendNewsBox'
import Home from '../views/sendNewsBox/home/Home'
import RightList from '../views/sendNewsBox/rightList/RightList'
import RoleList from '../views/sendNewsBox/roleList/RoleList'
import UserList from '../views/sendNewsBox/user-manage/UserList'
import NoPremission from '../views/sendNewsBox/noPremission/NoPremission'
import NotFound from '../views/sendNewsBox/notFound/NotFound'
import NewsAdd from '../views/sendNewsBox/news-manage/NewsAdd'
import NewsDraft from '../views/sendNewsBox/news-manage/NewsDraft'
import NewsCategory from '../views/sendNewsBox/news-manage/NewsCategory'
import Audit from '../views/sendNewsBox/audit-manage/Audit'
import AuditList from '../views/sendNewsBox/audit-manage/AuditList'
import Unpublished from '../views/sendNewsBox/publish-manage/Unpublished'
import Published from '../views/sendNewsBox/publish-manage/Published'
import Sunset from '../views/sendNewsBox/publish-manage/Sunset'
import { getToken } from '../utils/common'
const routes = () => {
  // RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
  function RequireAuth({ children }) {
    const authed = getToken()
    if (authed.length > 0) {
      // 判断 localstorage 中登录状态是否为 true
      // if (
      //   routeArr.findIndex((item) => item.key === location.pathname) === -1 &&
      //   location.pathname !== '/'
      // ) {
      //   // return <Navigate to="/403" /> // 跳转到登录
      //   return <NoPremission />
      // } else {
      // return children
      return children
      // }
    } else {
      return <Navigate to="/login" replace /> // 跳转到登录
    }
  }
  return [
    {
      path: '/',
      element: (
        <RequireAuth>
          <SendNewsBox />
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="/home" />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'user-manage/list',
          element: <UserList />,
        },
        {
          path: 'right-manage',
          children: [
            {
              path: '',
              element: <Navigate to="right/list" />,
            },
            {
              path: 'right/list',
              element: <RightList />,
            },
            {
              path: 'role/list',
              element: <RoleList />,
            },
          ],
        },
        {
          path: 'news-manage',
          children: [
            {
              path: 'add',
              element: <NewsAdd />,
            },
            {
              path: 'draft',
              element: <NewsDraft />,
            },
            {
              path: 'category',
              element: <NewsCategory />,
            },
          ],
        },
        {
          path: 'audit-manage',
          children: [
            {
              path: 'audit',
              element: <Audit />,
            },
            {
              path: 'list',
              element: <AuditList />,
            },
          ],
        },
        {
          path: 'publish-manage',
          children: [
            {
              path: 'unpublished',
              element: <Unpublished />,
            },
            {
              path: 'published',
              element: <Published />,
            },
            {
              path: 'sunset',
              element: <Sunset />,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]
}
export default routes()
