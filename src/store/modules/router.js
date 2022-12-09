import { generatorDynamicRouter } from '@/router/generator-routers'
import defaultRouter from '@/config/defaultRouter'

/**
 * @description 访问路由
 */
export default {
  state: {
    routers: defaultRouter.constantRouterMap,
    addRouters: []
  },

  getters: {
    routers: state => state.routers,
    addRouters: state => state.addRouters
  },

  mutations: {
    /* 生成动态路由 */
    GENERATE_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = defaultRouter.constantRouterMap.concat(routers)
    }
  },

  actions: {
    /**
     * @description 生成动态路由
     * @param {Function} commit
     * @param {Object} mode
     * @return {Promise}
     */
    GenerateRoutes ({ commit }, config) {
      return generatorDynamicRouter(config).then(routers => {
        commit('GENERATE_ROUTERS', routers)
      })
    }
  }
}
