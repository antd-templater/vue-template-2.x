import { UserLayout } from '@/layouts'
import defaultRouter from '@/config/defaultRouter'

/**
 * @description 静态路由
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
defaultRouter.constantRouterMap.push(
  {
    path: '/index',
    name: 'index',
    redirect: '/system/OrganizeManage',
    hidden: false
  },
  {
    path: '/login',
    redirect: '/login/Login',
    component: UserLayout,
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import(`@/views/login/Login`)
      }
    ],
    hidden: false
  }
)

export default defaultRouter
