import Vue from 'vue'
import store from '@/store/index'
import defaultSettings from '@/config/defaultSettings'

import { ACCESS_TOKEN } from '@/store/variable'

import {
  TOGGLE_WEAK,
  TOGGLE_COLOR,
  TOGGLE_THEME,
  TOGGLE_TITLE,
  TOGGLE_LAYOUT,
  TOGGLE_MULTI_TAB,
  TOGGLE_KEEP_ALIVE,
  TOGGLE_HIDE_HEADER,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH
} from '@/store/mutation'

/**
 * @description 核心初始化
 */
export default function Initializer () {
  store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
  store.commit(TOGGLE_WEAK, Vue.ls.get(TOGGLE_WEAK, defaultSettings.colorWeak))
  store.commit(TOGGLE_COLOR, Vue.ls.get(TOGGLE_COLOR, defaultSettings.primaryColor))
  store.commit(TOGGLE_TITLE, Vue.ls.get(TOGGLE_TITLE, defaultSettings.title))
  store.commit(TOGGLE_THEME, Vue.ls.get(TOGGLE_THEME, defaultSettings.navTheme))
  store.commit(TOGGLE_LAYOUT, Vue.ls.get(TOGGLE_LAYOUT, defaultSettings.layout))
  store.commit(TOGGLE_MULTI_TAB, Vue.ls.get(TOGGLE_MULTI_TAB, defaultSettings.multiTab))
  store.commit(TOGGLE_KEEP_ALIVE, Vue.ls.get(TOGGLE_KEEP_ALIVE, defaultSettings.keepAlive))
  store.commit(TOGGLE_HIDE_HEADER, Vue.ls.get(TOGGLE_HIDE_HEADER, defaultSettings.autoHideHeader))
  store.commit(TOGGLE_FIXED_HEADER, Vue.ls.get(TOGGLE_FIXED_HEADER, defaultSettings.fixedHeader))
  store.commit(TOGGLE_FIXED_SIDEBAR, Vue.ls.get(TOGGLE_FIXED_SIDEBAR, defaultSettings.fixedSidebar))
  store.commit(TOGGLE_CONTENT_WIDTH, Vue.ls.get(TOGGLE_CONTENT_WIDTH, defaultSettings.contentWidth))
}
