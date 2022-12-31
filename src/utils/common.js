import { Badge } from 'antd'
const isObject = (obj) => obj === Object(obj)
const isNil = (val) => val === undefined || val === null
const isEmpty = (val) => {
  return isString(val) || isObject(val) || Array.isArray(val)
    ? !Object.keys(val).length
    : isNil(val)
}
const isString = (val) => typeof val === 'string'
/**
 * 删除Object指定的key返回新的Object
 * @param {*} obj对象
 * @param {*} key数组
 * @returns
 */
export const delObjByKey = (obj = {}, arr = []) => {
  if (isEmpty(obj) || !isObject(obj)) return {}
  if (isEmpty(arr) || (!Array.isArray(arr) && !isString(arr))) return obj

  return Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}
export const setUserInfo = (info) => {
  localStorage.setItem('user', JSON.stringify(info))
}
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}
export const setToken = (info) => {
  localStorage.setItem('token', JSON.stringify(info))
}
export const getToken = () => {
  return JSON.parse(localStorage.getItem('token')) || ''
}
export const auditMap = {
  0: <Badge status="default" text="未审核" />,
  1: <Badge status="processing" text="审核中" />,
  2: <Badge status="success" text="已通过" />,
  3: <Badge status="error" text="未通过" />,
}
export const publishMap = {
  0: <Badge status="default" text="未发布" />,
  1: <Badge status="processing" text="待发布" />,
  2: <Badge status="success" text="已上线" />,
  3: <Badge status="warning" text="已下线" />,
}
