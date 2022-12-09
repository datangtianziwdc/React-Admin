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
  const {
    role: { rights },
  } = getUserInfo()
  const getRoutes = async () => {
    const routesResponse = await axios.get('/rights')
    const childrenResponse = await axios.get('/children')
    setRouteArr([...routesResponse.data, ...childrenResponse.data])
    if (
      routeArr.findIndex((e) => e.key === pathname) !== -1 &&
      pathname !== '/'
    ) {
      setNotFound(false)
    }
    if (rights.includes(pathname) && pathname !== '/') {
      setNoPremission(false)
    }
    setLoading(false)
  }
  useEffect(() => {
    getRoutes()
  }, [])
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
    ) : notFount ? (
      <NotFound />
    ) : (
      <NoPremission />
    ) //
  }
}
