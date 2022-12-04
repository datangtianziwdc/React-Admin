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
  return JSON.parse(localStorage.getItem('user')) || {}
}
export const setToken = (info) => {
  localStorage.setItem('token', JSON.stringify(info))
}
export const getToken = () => {
  return JSON.parse(localStorage.getItem('token')) || ''
}
