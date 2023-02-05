import { BasicLayout, PageView, PageFrame } from '@/layouts'

/**
 * @description 路由配置
 *
 * @attribute rootRouter - 根路由
 * @attribute externalRouter - 外部路由
 * @attribute notFoundRouter - 异常路由
 * @attribute constantRouterMap - 静态路由
 */
export default {
  rootRouter: {
    key: 'Basic',
    name: 'Basic',
    path: '/',
    redirect: '/index',
    component: BasicLayout,
    meta: { title: '首页' }
  },

  externalRouter: {
    key: 'External',
    name: 'External',
    path: '/external',
    redirect: '/external/link',
    component: PageView,
    children: [
      {
        key: 'ExternalLink',
        name: 'ExternalLink',
        path: '/external/link',
        component: PageFrame,
        meta: {
          title: '外部链接',
          match: 'external',
          external: '',
          componentName: 'ExternalLink',
          hideChildInMenu: true,
          hideInMenu: true,
          allowCache: true
        }
      }
    ],
    meta: {
      title: '外部链接',
      componentName: 'External',
      hideChildInMenu: true,
      hideInMenu: true,
      allowCache: true
    },
    hidden: true
  },

  notFoundRouter: [
    {
      name: 'PageError403',
      path: '/PageError403',
      component: () => import(`@/views/error/PageError403`),
      hidden: true
    },
    {
      name: 'PageError404',
      path: '/PageError404',
      component: () => import(`@/views/error/PageError404`),
      hidden: true
    },
    {
      name: 'PageError500',
      path: '/PageError500',
      component: () => import(`@/views/error/PageError500`),
      hidden: true
    },
    {
      name: '*',
      path: '*',
      redirect: '/PageError404',
      hidden: true
    }
  ],

  constantRouterMap: []
}
