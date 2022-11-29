const isObject = (obj) => obj === Object(obj)
const isNil = (val) => val === undefined || val === null
const isEmpty = (val) => {
  return isString(val) || isObject(val) || Array.isArray(val)
    ? !Object.keys(val).length
    : isNil(val)
}
const isString = (val) => typeof val === 'string'
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
