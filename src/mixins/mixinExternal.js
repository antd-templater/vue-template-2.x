/**
 * @description 外部路由
 */
export default {
  methods: {
    /**
     * @description 获取外部链接
     * @param {Object} route
     * @return {String}
     */
    getExternal (route) {
      let link = ''
      const path = route.path || ''
      const meta = route.meta || {}
      const query = route.query || {}
      const matched = route.matched || []
      const tablink = '/external/link'

      // 获取外部链接
      path !== tablink ? (link = meta.external) : (link = query.from)

      // 处理外部链接
      if (link) {
        // 转换为规范的路径 file or http
        if (/^file:\/\/\/|^https?:\/\//.test(link)) {
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
        } else if (/^\/\/\/.+/.test(link)) {
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
          link = 'file:' + link
        } else if (/^\/\/.+/.test(link)) {
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
          link = window.location.protocol + link
        } else if (/^\/\/.+/.test(link)) {
          link = link.replace(/^\//, '')
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
          link = window.location.protocol + link
        } else if (/^\/.+/.test(link)) {
          link = link.replace(/^\//, '')
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
          link = window.location.protocol + '//' + window.location.host + '/' + link
        } else if (/\w+/.test(link)) {
          link = link.replace(/^([^?]*)\/$/, '$1')
          link = link.replace(/^([^?]*)\/(?=\?)/, '$1')
          link = window.location.protocol + '//' + link
        }

        // link 转换为 url对象
        const urlLink = new URL(link)
        const urlSearch = urlLink.search
        const urlOrigin = urlLink.origin
        const urlParams = new URLSearchParams(urlSearch)
        let urlPathname = urlLink.pathname.replace(/\/+$/, '')

        // 合并来自于路由中的参数
        if (path !== tablink) {
          const lenth = matched.length - 1
          const route = matched[lenth] || {}
          const escape = /[\^[\]|\-+*.,?#{}()\\$]/g
          const source = route.path.replace(escape, '\\$&')
          const regex = new RegExp(source, 'i')
          const param = path.split(regex)[1]
          if (param) {
            urlPathname = urlPathname + param.replace(/\/+$/, '')
          }
          for (const key in query) {
            if (query[key] !== undefined && query[key] !== null) {
              urlParams.set(key, query[key])
            }
          }
        }

        // 对参数进行默认排序
        urlParams.sort()

        // 传递 iframe 参数
        link = urlOrigin + urlPathname + '?' + urlParams.toString()
      }

      // 返回外部链接
      return link
    }
  }
}
