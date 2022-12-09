import Vue from 'vue'

import {
  TOGGLE_WEAK,
  TOGGLE_COLOR,
  TOGGLE_TITLE,
  TOGGLE_MEDIA,
  TOGGLE_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_MULTI_TAB,
  TOGGLE_KEEP_ALIVE,
  TOGGLE_HIDE_HEADER,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_SIDEBAR_TYPE,
  TOGGLE_MOBILE_TYPE
} from '@/store/mutation'

/**
 * @description 系统应用
 */
export default {
  state: {
    weak: false,
    color: '',
    title: '',
    media: '',
    theme: 'dark',
    layout: '',
    multiTab: true,
    keepAlive: true,
    autoHideHeader: false,
    fixedHeader: false,
    fixedSidebar: false,
    contentWidth: '',
    sideCollapsed: false,
    isMobile: false
  },

  getters: {
    colorWeak: state => state.weak,
    primaryColor: state => state.color,
    domTitle: state => state.title,
    mediaMark: state => state.media,
    navTheme: state => state.theme,
    layoutMode: state => state.layout,
    multiTab: state => state.multiTab,
    keepAlive: state => state.keepAlive,
    autoHideHeader: state => state.autoHideHeader,
    fixedHeader: state => state.fixedHeader,
    fixedSidebar: state => state.fixedSidebar,
    contentWidth: state => state.contentWidth,
    sideCollapsed: state => state.sideCollapsed,
    isSideMenu: state => state.layout === 'sidemenu',
    isTopMenu: state => state.layout === 'topmenu',
    isMobile: state => state.isMobile
  },

  mutations: {
    /* 切换弱色模式 */
    [TOGGLE_WEAK]: (state, mode) => {
      state.weak = mode
      Vue.ls.set(TOGGLE_WEAK, mode)
    },
    /* 切换肤色 */
    [TOGGLE_COLOR]: (state, mode) => {
      state.color = mode
      Vue.ls.set(TOGGLE_COLOR, mode)
    },
    /* 切换页面标题 */
    [TOGGLE_TITLE]: (state, mode) => {
      state.title = mode
      document.title = mode
    },
    /* 切换媒体查询 */
    [TOGGLE_MEDIA]: (state, mode) => {
      state.media = mode
    },
    /* 切换主题风格 */
    [TOGGLE_THEME]: (state, mode) => {
      state.theme = mode
      Vue.ls.set(TOGGLE_THEME, mode)
    },
    /* 切换布局模式 */
    [TOGGLE_LAYOUT]: (state, mode) => {
      state.layout = mode
      Vue.ls.set(TOGGLE_LAYOUT, mode)
    },
    /* 切换启用多标签页 */
    [TOGGLE_MULTI_TAB]: (state, mode) => {
      state.multiTab = mode
      Vue.ls.set(TOGGLE_MULTI_TAB, mode)
    },
    /* 切换标签页缓存 */
    [TOGGLE_KEEP_ALIVE]: (state, mode) => {
      state.keepAlive = mode
      Vue.ls.set(TOGGLE_KEEP_ALIVE, mode)
    },
    /* 切换顶部导航隐藏 */
    [TOGGLE_HIDE_HEADER]: (state, mode) => {
      state.autoHideHeader = mode
      Vue.ls.set(TOGGLE_HIDE_HEADER, mode)
    },
    /* 切换顶部导航固定 */
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode
      Vue.ls.set(TOGGLE_FIXED_HEADER, mode)
    },
    /* 切换左侧导航固定 */
    [TOGGLE_FIXED_SIDEBAR]: (state, mode) => {
      state.fixedSidebar = mode
      Vue.ls.set(TOGGLE_FIXED_SIDEBAR, mode)
    },
    /* 切换导航布局设置 */
    [TOGGLE_CONTENT_WIDTH]: (state, mode) => {
      state.contentWidth = mode
      Vue.ls.set(TOGGLE_CONTENT_WIDTH, mode)
    },
    /* 切换左侧导航收缩/展开 */
    [TOGGLE_SIDEBAR_TYPE]: (state, mode) => {
      state.sideCollapsed = mode
    },
    /* 切换手机端模式 */
    [TOGGLE_MOBILE_TYPE]: (state, mode) => {
      state.isMobile = mode
    }
  },

  actions: {
    /**
     * @description 切换弱色模式
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleWeak ({ commit }, mode) {
      commit(TOGGLE_WEAK, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换肤色
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleColor ({ commit }, mode) {
      commit(TOGGLE_COLOR, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换页面标题
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleTitle ({ commit }, mode) {
      commit(TOGGLE_TITLE, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换媒体查询
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleMedia ({ commit }, mode) {
      commit(TOGGLE_MEDIA, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换主题风格
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleTheme ({ commit }, mode) {
      commit(TOGGLE_THEME, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换布局模式
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleLayout ({ commit }, mode) {
      commit(TOGGLE_LAYOUT, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换启用多标签页
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleMultiTab ({ commit }, mode) {
      commit(TOGGLE_MULTI_TAB, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换标签页缓存
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleKeepAlive ({ commit }, mode) {
      commit(TOGGLE_KEEP_ALIVE, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换顶部导航隐藏
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleHideHeader ({ commit }, mode) {
      commit(TOGGLE_HIDE_HEADER, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换顶部导航固定
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleFixedHeader ({ commit }, mode) {
      commit(TOGGLE_FIXED_HEADER, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换左侧导航固定
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleFixedSidebar ({ commit }, mode) {
      commit(TOGGLE_FIXED_SIDEBAR, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换导航布局设置
     * @param {Function} commit
     * @param {String} mode
     * @return {Promise}
     */
    toggleContentWidth ({ commit }, mode) {
      commit(TOGGLE_CONTENT_WIDTH, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换左侧导航收缩/展开
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleSidebarType ({ commit }, mode) {
      commit(TOGGLE_SIDEBAR_TYPE, mode)
      return Promise.resolve()
    },

    /**
     * @description 切换手机端模式
     * @param {Function} commit
     * @param {Boolean} mode
     * @return {Promise}
     */
    toggleMobileType ({ commit }, mode) {
      commit(TOGGLE_MOBILE_TYPE, mode)
      return Promise.resolve()
    }
  }
}
