import { mapGetters } from 'vuex'

/**
 * @description 访问路由
 */
export default {
  computed: {
    ...mapGetters(['routers', 'addRouters'])
  }
}
