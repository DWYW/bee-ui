/**
 * 深度获取value值
 * @param {String} path value的寻址路径
 * @param {Object} obj object类型源数据
 */
export const deepValue = function (path, obj) {
  if (path === null || path === undefined) return null

  const keys = path.split('.')
  let value = obj

  for (let key in keys) {
    if (value[keys[key]] === undefined || value[keys[key]] === null) {
      value = null
      break
    } else {
      value = value[keys[key]]
    }
  }

  return value
}
