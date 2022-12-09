import { mapGetters, mapActions } from 'vuex'

/**
 * @description 用户信息
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
