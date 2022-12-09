import store from '@/store/index'

import app from '@/store/modules/app'
import tags from '@/store/modules/tags'
import user from '@/store/modules/user'
import router from '@/store/modules/router'

/**
 * @description 模块动态注册
 */
store.registerModule('app', app)
store.registerModule('tags', tags)
store.registerModule('user', user)
store.registerModule('router', router)

export default store
