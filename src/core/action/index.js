import Vue from 'vue'
import store from '@/store/index'

/**
 * @description 权限指令
 */
Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg
    const roles = store.getters.roles
    const elVal = vnode.context.$route.meta.permission
    const permissionId = (elVal instanceof String && [elVal]) || elVal

    for (const p of roles.permissions) {
      if (!permissionId || !permissionId.length) {
        return
      }

      if (!permissionId.includes(p.permissionId)) {
        continue
      }

      if (!p.actionList || !p.actionList.includes(actionName)) {
        if (!el.parentNode || !el.parentNode.removeChild(el)) {
          el.style.display = 'none'
        }
      }

      return
    }
  }
})
