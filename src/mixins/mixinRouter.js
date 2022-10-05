import { mapGetters } from 'vuex'

/**
 * @description 访问路由
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  computed: {
    ...mapGetters(['routers', 'addRouters'])
  }
}
