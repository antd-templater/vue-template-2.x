import Vue from 'vue'
import moment from 'moment'
import { ORG_ID, DATA_FLAG } from '@/store/variable'

/**
 * @description 补齐数值精度
 *
 * @param {String | Number} num
 * @param {String | Number} keep?
 * @return {String}
 */
export const takePadEnd = (num, keep = 0) => {
  const string = String(+num || 0)
  const [integer = '0', decimal = ''] = string.split('.')
  return +keep || decimal
    ? [integer, decimal.padEnd(+keep, '0')].join('.')
    : integer
}

/**
 * @description 处理数值精度
 *
 * @param {String | Number} num
 * @param {String | Number} digit?
 * @return {String}
 */
export const takeFixed = (num, digit = 0) => {
  if (!isFinite(+num)) {
    return '0.' + ''.padEnd(digit, 0)
  }

  let string = ''

  num = +num || 0
  digit = isFinite(digit) ? +digit : 2

  string = Math.round(Math.pow(10, digit) * num) / Math.pow(10, digit)
  string = String(string)

  if (~string.indexOf('.')) {
    const arr = string.split('.')
    string = arr[0] + '.' + arr[1].padEnd(digit, 0)
  } else {
    if (digit !== 0) {
      string += '.' + ''.padEnd(digit, '0')
    }
  }

  return string
}

/**
 * @description 取出节点数据
 *
 * @param {Array} tree
 * @param {String | Number} key
 * @param {String} value?
 * @param {String} children?
 * @return {Object}
 */
export const takeTreeByKey = (
  tree,
  key,
  value = 'value',
  children = 'children'
) => {
  function isOwnProperty (context, property) {
    return Object.prototype.hasOwnProperty.call(context, property)
  }
  function itType (val) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
  }
  function isArray (arr) {
    return itType(arr) === 'Array'
  }
  function isString (obj) {
    return itType(obj) === 'String'
  }
  function isNumber (obj) {
    return itType(obj) === 'Number'
  }

  if (isArray(tree) && (isString(key) || isNumber(key))) {
    for (let i = 0, l = tree.length; i < l; i++) {
      if (isOwnProperty(tree[i], value) && key === tree[i][value]) {
        return tree[i]
      }
      if (isArray(tree[i][children]) && tree[i][children].length > 0) {
        const result = takeTreeByKey(tree[i][children], key, value, children)
        if (Object.keys(result).length > 0) {
          return result
        }
      }
    }
    return {}
  }

  return {}
}

/**
 * @description 取出节点文本
 *
 * @param {Array} tree
 * @param {String | Number} key
 * @param {String} value?
 * @param {String} children?
 * @return {String}
 */
export const takeLabelByKey = (
  tree,
  key,
  label = 'label',
  value = 'value',
  children = 'children'
) => {
  function isOwnProperty (context, property) {
    return Object.prototype.hasOwnProperty.call(context, property)
  }
  function itType (val) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
  }
  function isArray (arr) {
    return itType(arr) === 'Array'
  }

  if ([undefined, null].includes(key)) {
    return key
  }

  if (isArray(label)) {
    for (const name of label) {
      const node = takeTreeByKey(tree, key, value, children)
      if (isOwnProperty(node, name)) {
        return node[name]
      }
    }
    return key
  }

  return takeTreeByKey(tree, key, value, children)[label] || key
}

/**
 * @description 根据格式转换 日期
 *
 * @param {Date | String | Number} date
 * @param {String} format?
 * @return {Moment | null}
 */
export const takeTimeToDate = (date, format) => {
  if (date) {
    try {
      return moment(date, format)
    } catch {}
  }
  return null
}

/**
 * @description 根据格式转换 时间
 *
 * @param {Date | String | Number} date
 * @param {String} format?
 * @return {String}
 */
export const takeTimeToFormat = (date, format) => {
  if (date) {
    try {
      return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
    } catch {}
  }
  return ''
}

/**
 * @description 封装传参格式
 *
 * @param {String} action?
 * @param {Object} param?
 * @param {Number} pageNo?
 * @param {Number} pageSize?
 * @param {String} sortField?
 * @param {String} sortOrder?
 * @return {Object}
 */
export const requestBuilder = (
  action = '',
  param = {},
  pageNo = 0,
  pageSize = 10,
  sortField = '',
  sortOrder = ''
) => {
  const toSortField = (field, order) => {
    const sortField =
      field && field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
    const sortOrder = order && order.replace(/end$/i, '')
    return (sortOrder && sortField) || undefined
  }
  const toSortOrder = (field, order) => {
    const sortField =
      field && field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
    const sortOrder = order && order.replace(/end$/i, '')
    return (sortField && sortOrder) || undefined
  }

  const sortTopField = param.sortTopField
  const sortTopOrder = param.sortTopOrder

  delete param.sortTopField
  delete param.sortTopOrder

  return {
    param,
    action,
    orgId: Vue.ls.get(ORG_ID),
    dataFlag: Vue.ls.get(DATA_FLAG),
    sortField: toSortField(sortField, sortOrder),
    sortOrder: toSortOrder(sortField, sortOrder),
    sortTopField: toSortField(sortTopField, sortTopOrder),
    sortTopOrder: toSortOrder(sortTopField, sortTopOrder),
    pageSize: pageSize !== null ? pageSize : undefined,
    pageNo: pageNo !== null ? pageNo : undefined
  }
}

/**
 * @description 递归更新属性值
 *
 * @param {Array} array
 * @return {Array | Object}
 */
export const deepUpdate = (...array) => {
  function isOwnProperty (context, property) {
    return Object.prototype.hasOwnProperty.call(context, property)
  }
  function itType (val) {
    return Object.prototype.toString
      .call(val)
      .replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1')
  }
  function isArray (arr) {
    return itType(arr) === 'Array'
  }
  function isObject (obj) {
    return itType(obj) === 'Object'
  }
  function isAllArray (oldArr, newArr) {
    return isArray(oldArr) && isArray(newArr)
  }
  function isAllObject (oldObj, newObj) {
    return isObject(oldObj) && isObject(newObj)
  }

  if (array.length > 1) {
    const oldData = array[0]
    const newArrs = array.slice(1)
    for (const newData of newArrs) {
      if (isAllObject(oldData, newData)) {
        for (const key in oldData) {
          if (isOwnProperty(oldData, key) && isOwnProperty(newData, key)) {
            if (
              isAllArray(oldData[key], newData[key]) ||
              isAllObject(oldData[key], newData[key])
            ) {
              deepUpdate(oldData[key], newData[key])
              continue
            }
            oldData[key] = newData[key]
          }
        }
      }
      if (isAllArray(oldData, newData)) {
        for (const key of newData.keys()) {
          if (
            isAllArray(oldData[key], newData[key]) ||
            isAllObject(oldData[key], newData[key])
          ) {
            deepUpdate(oldData[key], newData[key])
            continue
          }
          oldData[key] = newData[key]
        }
      }
    }
  }

  return array[0]
}
