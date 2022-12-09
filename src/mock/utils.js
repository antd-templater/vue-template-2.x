/**
 * @description 接口路径解析
 *
 * @param {String} string
 * @return {String}
 */
export const toRegex = string => {
  const regex = /[-/\\^$*+?.()|[\]{}]/g
  const source = string.replace(regex, '\\$&')
  return new RegExp(source + '(\\?.*)?$')
}

/**
 * @description 获取 body 参数
 *
 * @param {JsonString} options
 * @return {Object}
 */
export const getBody = options => {
  return options.body ? JSON.parse(options.body) : {}
}

/**
 * @description 获取 url param 参数
 *
 * @param {UrlParams} options
 * @return {Object}
 */
export const getParam = options => {
  const url = options.url
  const search = url.split('?')[1]

  if (search) {
    const decode = decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')

    return JSON.parse('{"' + decode + '"}')
  }

  return {}
}

/**
 * @description 返回响应数据
 *
 * @param {Any} result
 * @param {String} message
 * @param {String} code
 * @return {Object}
 */
export const builder = (result, message = '', code = '0000') => {
  return {
    message,
    result,
    code
  }
}

/**
 * @description 默认导出如下方法
 */
export default {
  toRegex,
  getBody,
  getParam,
  builder
}
