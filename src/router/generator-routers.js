import defaultRouter from '@/config/defaultRouter'
import { requestBuilder } from '@/utils/util'
import * as userApi from '@/api/user'

/**
 * @description 转换树形结构
 *
 * @param {Array <router>} list
 * @param {Array <router>} tree
 * @param {Object <router>} parent
 * @return {undefined}
 */
const listToTree = (list, tree, parent) => {
  list.forEach(item => {
    if (item.parentId === parent.id) {
      // 创建 route
      const key = item.key || item.name
      const route = { ...item, key, children: [] }

      // 迭代 list，找到符合的子菜单
      listToTree(list, route.children, item)

      // 删掉不存在 children 属性
      if (route.children.length <= 0) {
        delete route.children
      }

      // push route
      tree.push(route)
    }
  })
}

/**
 * @description 转换层级路由表
 *
 * @param {Array <router>} routers
 * @param {Object <router>} parent
 * @param {Object <component>} components
 * @return {Array <router>}
 */
export const treeToRoute = (routers, parent = {}, components = {}) => {
  return routers.map(item => {
    const {
      icon,
      title,
      target,
      allowCache,
      hideInMenu,
      hideChildInMenu
    } = item.meta || {}
    const parentAllowCache = (parent.meta || {}).allowCache
    const isNotIframeView = item.component !== 'PageFrame'
    const match = isNotIframeView ? 'path' : 'external'
    const currentRouter = {
      // 路由id
      id: item.id,

      // 路由path
      path: generatorDynamicPath(parent, item),

      // 路由名称
      name: item.name || item.key || '',

      // 路由组件
      component: loadDynamicComponent(parent, item, components),

      // 路由meta
      meta: {
        icon,
        title,
        match,
        target,
        groupId: (parent.meta || {}).groupId || item.id,
        external: (!isNotIframeView && item.path) || '',
        permission: [item.name || item.key || ''],
        componentName: item.component || item.name || item.key || '',
        allowCache: (parentAllowCache !== false && parentAllowCache !== 'N') || (allowCache !== false && allowCache !== 'N'),
        hideChildInMenu,
        hideInMenu
      }
    }

    // 是否无效图标
    if (!icon) {
      delete currentRouter.meta.icon
    }

    // 是否设置了隐藏菜单
    if (hideInMenu === true || hideInMenu === 'Y') {
      currentRouter.hidden = true
      currentRouter.hideChildrenInMenu = true
    }

    // 是否设置隐藏子菜单
    if (hideChildInMenu === true || hideChildInMenu === 'Y') {
      currentRouter.hideChildrenInMenu = true
    }

    // PageFrame 使用别名
    if (!isNotIframeView) {
      currentRouter.alias = currentRouter.path + '/*'
    }

    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }

    // 重定向
    if (item.redirect) {
      currentRouter.redirect = item.redirect
    }

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = treeToRoute(
        item.children,
        currentRouter,
        components
      )
    }

    // 是否设置了隐藏子菜单
    if (!currentRouter.hideChildrenInMenu && currentRouter.children?.every(route => route.meta && (route.meta.hideInMenu === true || route.meta.hideInMenu === 'Y'))) {
      currentRouter.hideChildrenInMenu = true
    }

    // 路由表
    return currentRouter
  })
}

/**
 * @description 动态生成菜单
 *
 * @param {Object} params
 * @param {Object <component>} components
 * @return {Promise <router>}
 */
export const generatorDynamicRouter = ({ params, components }) => {
  return userApi.getUserMenu(requestBuilder('generateRoutes', params, '0', '0')).then(
    res => {
      if (res.code !== '0000') {
        return Promise.reject(res)
      }

      // 创建节点组
      const { result = [] } = res
      const { children = [] } = {}

      // 生成树型数组
      listToTree(result, children, { id: '0' })

      // 生成路由表
      const tree = [{ ...defaultRouter.rootRouter, children }]
      const routers = treeToRoute(tree, {}, components)

      // 添加静态路由
      routers[0].children.unshift(defaultRouter.externalRouter)
      routers.push(...defaultRouter.notFoundRouter)

      // 菜单路由
      return routers
    }
  )
}

/**
 * @description 动态生成路由路径
 *
 * @param {Object <router>} parent
 * @param {Object <router>} item
 * @return {path}
 */
export const generatorDynamicPath = (parent = {}, item = {}) => {
  const keyPath = item.key || ''
  const itemPath = item.path || ''
  const parentPath = parent.path || ''
  const isNotIframeView = item.component !== 'PageFrame'

  return !isNotIframeView || !itemPath
    ? (parentPath + '/' + keyPath).replace(/^\/*([^/].*)/, '/$1')
    : itemPath
}

/**
 * @description 动态加载路由对应页面的组件
 *
 * @param {Object <router>} parent
 * @param {Object <router>} item
 * @param {Object <component>} components
 * @return {component}
 */
export const loadDynamicComponent = (
  parent = {},
  item = {},
  components = {}
) => {
  // 组件路径
  const itemPath = item.path || ''
  const parentPath = parent.path || ''
  const componentPath = item.component || ''
  const isNotIframeView = item.component !== 'PageFrame'
  const tempViewPath = !(isNotIframeView && itemPath)
    ? parentPath + '/' + componentPath
    : itemPath
  const currentPath = tempViewPath.replace(/^\/*([^/].*)/, '/$1')

  // component
  if (String(componentPath) !== componentPath) {
    return componentPath
  }

  // layout
  if (components[componentPath]) {
    return components[componentPath]
  }

  // views
  if (components[currentPath]) {
    return components[currentPath]
  }

  // 默认组件
  return () => import(`@/views/${currentPath.replace(/^\/+/, '')}`)
}

/**
 * @description 布局页面路由生成器
 *
 * @param {Array <context>} contexts
 * @return {Map <string, component>}
 */
export const generatorLayoutRouter = (...contexts) => {
  const routerComponents = {}
  const replaceKeyRegex = /^.*\/([^/]+)\.vue$/
  for (const context of contexts) {
    context.keys().forEach(item => {
      const key = item.replace(replaceKeyRegex, '$1')
      routerComponents[key] = context(item).default
    })
  }
  return routerComponents
}

/**
 * @description 业务页面路由生成器
 *
 * @param {Array <context>} contexts
 * @return {Map <string, component>}
 */
export const generatorViewsRouter = (...contexts) => {
  const routerComponents = {}
  const replaceKeyRegex = /^\.{0,2}(\/([^/]+\/?)+)\.vue$/
  for (const context of contexts) {
    context.keys().forEach(item => {
      const key = item.replace(replaceKeyRegex, '$1')
      if (!routerComponents[key]) {
        routerComponents[key] = () => Promise.resolve(context(item))
      }
    })
  }
  return routerComponents
}
