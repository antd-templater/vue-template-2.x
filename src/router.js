import Vue from 'vue'
import Router from 'vue-router'
import defaultRouter from './router.constant'

/**
 * @description Router 实例
 */
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER || '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouter.constantRouterMap
})
