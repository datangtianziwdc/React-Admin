import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, Navigate } from 'react-router-dom'
import NoPremission from '../../views/sendNewsBox/noPremission/NoPremission'
import NotFound from '../../views/sendNewsBox/notFound/NotFound'
import { getUserInfo } from '../../utils/common'
import { Spin } from 'antd'
import './loding.scss'

export default function AuthEntication({ children }) {
  const { pathname } = useLocation()
  const [routeArr, setRouteArr] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFount, setNotFound] = useState(true)
  const [noPremission, setNoPremission] = useState(true)
  const userInfo = getUserInfo() ? getUserInfo() : { role: { rights: [] } }
  const whiteList = ['/login']
  const getRoutes = async () => {
    const routesResponse = await axios.get('/rights')
    const childrenResponse = await axios.get('/children')
    setRouteArr([...routesResponse.data, ...childrenResponse.data])
    if(routeArr.length>0){
      localStorage.setItem('routes', JSON.stringify(routeArr))
    }
  }
  const setPermission = () => {
    console.log('setPermission', pathname)
    let routeList =
      routeArr.length > 0
        ? routeArr
        : JSON.parse(localStorage.getItem('routes'))
    console.log(
      '路由列表是否存在',
      routeList.findIndex((e) => e.key === pathname) !== -1,
      userInfo.role.rights.includes(pathname),
      pathname === '/',
      pathname
    )
    console.log(
      '判断条件1',
      (routeList.findIndex((e) => e.key === pathname) !== -1 &&
        userInfo.role.rights.includes(pathname)) ||
        pathname === '/'
    )
    if (
      (routeList.findIndex((e) => e.key === pathname) !== -1 &&
        userInfo.role.rights.includes(pathname)) ||
      pathname === '/'
    ) {
      if (!whiteList.includes(pathname)) {
        setNotFound(false)
      }
    } else if (pathname === '/') {
      setNotFound(false)
    } else {
      setNotFound(true)
    }
    console.log(
      '判断条件2',
      userInfo?.role.rights,

      '===========================',
      routeList,
      userInfo?.role.rights.includes(pathname) || pathname === '/',
      routeList.findIndex((e) => e.key === pathname) !== -1
    )
    if (userInfo?.role.rights.includes(pathname) || pathname === '/') {
      if (!whiteList.includes(pathname)) {
        setNoPremission(false)
      }
    } else if (pathname === '/') {
      setNoPremission(false)
    } else if (routeList.findIndex((e) => e.key === pathname) !== -1) {
      setNoPremission(true)
    } else {
      setNoPremission(false)
    }
    setLoading(false)
  }
  useEffect(() => {
    getRoutes()
  }, [])
  useEffect(() => {
    setPermission()
  }, [pathname])
  if (!(notFount && noPremission)) {
    return loading ? (
      <div className="loadingContainer">
        <Spin size="large" />
      </div>
    ) : (
      children
    )
  } else {
    return loading ? (
      <div className="loadingContainer">
        <Spin size="large" />
      </div>
    ) : noPremission ? (
      <NoPremission />
    ) : (
      // <NotFound />
      children
    ) //
  }
}
