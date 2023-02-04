import { mapGetters, mapActions } from 'vuex'

/**
 * @description 用户信息
 */
export default {
  computed: {
    ...mapGetters([
      'rememberMe',
      'nickName',
      'userInfo',
      'avatar',
      'roles'
    ])
  },
  methods: {
    ...mapActions(['Login', 'Logout'])
  }
}
