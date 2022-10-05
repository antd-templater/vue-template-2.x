import { mapGetters, mapActions } from 'vuex'

/**
 * @description 用户信息
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  computed: {
    ...mapGetters([
      'rememberMe',
      'personName',
      'nickname',
      'userInfo',
      'avatar',
      'roles'
    ])
  },
  methods: {
    ...mapActions(['Login', 'Logout'])
  }
}
