import Vue from 'vue'

// 储存字段
const VISITED_TAGS = 'VISITED_TAGS'

// 是否为数组
const isArray = (arr, bool) => {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return !bool || !!arr.length
  }
  return false
}

// 是否为对象
const isObject = (obj, bool) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return !bool || !!Object.keys(obj).length
  }
  return false
}

// 数据缓存
const _stackTags = []
const _cachedTags = []
const _visitedTags = Vue.ls.get(VISITED_TAGS) || []
const _currentTag = {}
const _component = {}

/**
 * @description 访问路由
 */
export default {
  state: {
    stackTags: _stackTags,
    cachedTags: _cachedTags,
    visitedTags: _visitedTags,
    currentTag: _currentTag,
    component: _component
  },

  getters: {
    stackTags: state => state.stackTags,
    cachedTags: state => state.cachedTags,
    visitedTags: state => state.visitedTags,
    currentTag: state => state.currentTag
  },

  mutations: {
    /* 标记标签页缓存 */
    ADD_CACHED_TAGS: (state, tags) => {
      let cachedTags = []
      if (isArray(state.cachedTags)) {
        cachedTags = Object.assign([], state.cachedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const name = meta.componentName
          if (cachedTags.includes(name)) {
            continue
          }
          if (meta.allowCache !== false) {
            cachedTags.push(name)
          }
        }
        state.cachedTags = cachedTags
      }
    },
    /* 标记标签页访问 */
    ADD_VISITED_TAGS: (state, tags) => {
      // 访问记录
      let visitedTags = []
      if (isArray(state.visitedTags)) {
        visitedTags = Object.assign([], state.visitedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          if (
            visitedTags.some(v =>
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            )
          ) {
            state.currentTag = visitedTags.find(v =>
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            )
            continue
          }
          const cloneTag = Object.assign(
            {},
            {
              fullPath: tag.fullPath,
              alias: tag.alias,
              path: tag.path,
              hash: tag.hash,
              meta: tag.meta,
              name: tag.name,
              query: tag.query,
              params: tag.params,
              title: tag.meta.title || '未定义',
              matched: tag.matched.map(tag => ({
                path: tag.path,
                name: tag.name,
                meta: tag.meta
              }))
            }
          )
          state.currentTag = cloneTag
          visitedTags.push(cloneTag)
        }
        state.visitedTags = visitedTags
        Vue.ls.set(VISITED_TAGS, visitedTags)
      }
      // 历史记录
      let stackTags = []
      if (isArray(state.stackTags)) {
        stackTags = Object.assign([], state.stackTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          if (
            stackTags.some(v =>
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            )
          ) {
            const key = stackTags.findIndex(v =>
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            )
            const ref = stackTags.find(v =>
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            )
            stackTags.splice(key, 1)
            stackTags.unshift(ref)
            continue
          }
          const cloneTag = Object.assign(
            {},
            {
              fullPath: tag.fullPath,
              alias: tag.alias,
              path: tag.path,
              hash: tag.hash,
              meta: tag.meta,
              name: tag.name,
              query: tag.query,
              params: tag.params,
              title: tag.meta.title || '未定义',
              matched: tag.matched.map(tag => ({
                path: tag.path,
                name: tag.name,
                meta: tag.meta
              }))
            }
          )
          stackTags.unshift(cloneTag)
        }
        state.stackTags = stackTags
      }
    },
    /* 清理标签页缓存 */
    DEL_CACHED_TAGS: (state, tags) => {
      let cachedTags = []
      if (isArray(state.cachedTags)) {
        cachedTags = Object.assign([], state.cachedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const name = meta.componentName
          for (const n of cachedTags) {
            if (n === name) {
              const index = cachedTags.indexOf(n)
              cachedTags.splice(index, 1)
              break
            }
          }
        }
        state.cachedTags = cachedTags
      }
    },
    /* 清理标签页访问 */
    DEL_VISITED_TAGS: (state, tags) => {
      // 访问记录
      let visitedTags = []
      if (isArray(state.visitedTags)) {
        visitedTags = Object.assign([], state.visitedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const [k, v] of visitedTags.entries()) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              visitedTags.splice(k, 1)
              break
            }
          }
        }
        state.visitedTags = visitedTags
        Vue.ls.set(VISITED_TAGS, visitedTags)
      }
      // 历史记录
      let stackTags = []
      if (isArray(state.stackTags)) {
        stackTags = Object.assign([], state.stackTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const [k, v] of stackTags.entries()) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              stackTags.splice(k, 1)
              break
            }
          }
        }
        state.stackTags = stackTags
      }
    },
    /* 清理其他标签页缓存 */
    DEL_OTHERS_CACHED_TAGS: (state, tags) => {
      const cachedTags = []
      let lastCachedTags = []
      if (isArray(state.cachedTags)) {
        lastCachedTags = Object.assign([], state.cachedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const name = meta.componentName
          for (const n of lastCachedTags) {
            if (n === name) {
              const index = lastCachedTags.indexOf(n)
              cachedTags.push(lastCachedTags[index])
              break
            }
          }
        }
        state.cachedTags = cachedTags
      }
    },
    /* 清理其他标签页访问 */
    DEL_OTHERS_VISITED_TAGS: (state, tags) => {
      // 访问记录
      const visitedTags = []
      let lastVisitedTags = []
      if (isArray(state.visitedTags)) {
        lastVisitedTags = Object.assign([], state.visitedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const [k, v] of lastVisitedTags.entries()) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              visitedTags.push(lastVisitedTags[k])
              break
            }
          }
        }
        state.visitedTags = visitedTags
        Vue.ls.set(VISITED_TAGS, visitedTags)
      }
      // 历史记录
      const stackTags = []
      let lastStackTags = []
      if (isArray(state.stackTags)) {
        lastStackTags = Object.assign([], state.stackTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const [k, v] of lastStackTags.entries()) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              stackTags.push(lastStackTags[k])
              break
            }
          }
        }
        state.stackTags = stackTags
      }
    },
    /* 清理所有标签页缓存 */
    DEL_ALL_CACHED_TAGS: (state, tags) => {
      state.cachedTags = []
    },
    /* 清理所有标签页访问 */
    DEL_ALL_VISITED_TAGS: (state, tags) => {
      state.stackTags = []
      state.visitedTags = []
      Vue.ls.set(VISITED_TAGS, [])
    },
    /* 更新所有标签页 */
    UPDATE_VISITED_TAGS: (state, tags) => {
      // 访问记录
      let visitedTags = []
      if (isArray(state.visitedTags)) {
        visitedTags = Object.assign([], state.visitedTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const v of visitedTags) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              Object.assign(v, {
                fullPath: tag.fullPath,
                alias: tag.alias,
                path: tag.path,
                hash: tag.hash,
                meta: tag.meta,
                name: tag.name,
                query: tag.query,
                params: tag.params,
                title: tag.meta.title || '未定义',
                matched: tag.matched.map(tag => ({
                  path: tag.path,
                  name: tag.name,
                  meta: tag.meta
                }))
              })
              break
            }
          }
        }
        state.visitedTags = visitedTags
        Vue.ls.set(VISITED_TAGS, visitedTags)
      }
      // 历史记录
      let stackTags = []
      if (isArray(state.stackTags)) {
        stackTags = Object.assign([], state.stackTags)
      }
      if (isObject(tags, true)) {
        tags = [tags]
      }
      if (isArray(tags, true)) {
        for (const tag of tags) {
          const meta = tag.meta || {}
          const match = meta.match || 'path'
          const isExternal = match === 'external'
          for (const v of stackTags) {
            if (
              !isExternal
                ? v[match] === tag[match]
                : v.meta[match] === tag.meta[match]
            ) {
              Object.assign(v, {
                fullPath: tag.fullPath,
                alias: tag.alias,
                path: tag.path,
                hash: tag.hash,
                meta: tag.meta,
                name: tag.name,
                query: tag.query,
                params: tag.params,
                title: tag.meta.title || '未定义',
                matched: tag.matched.map(tag => ({
                  path: tag.path,
                  name: tag.name,
                  meta: tag.meta
                }))
              })
              break
            }
          }
        }
        state.stackTags = stackTags
      }
    },
    /* 注入标签页实例 */
    INJECT_MULTIPLE: (state, node) => {
      state.component = node
    },
    /* 清理标签页实例 */
    CLEAR_MULTIPLE: (state, node) => {
      state.component = {}
    }
  },

  actions: {
    /**
     * @description 新增标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    AddTags ({ dispatch, commit, state }, tags) {
      return Promise.all([
        dispatch('AddCachedTags', tags),
        dispatch('AddVisitedTags', tags)
      ]).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 标记标签页缓存
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    AddCachedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('ADD_CACHED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 标记标签页访问
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    AddVisitedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('ADD_VISITED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 删除标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelTags ({ dispatch, commit, state }, tags) {
      return Promise.all([
        dispatch('DelCachedTags', tags),
        dispatch('DelVisitedTags', tags)
      ]).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理标签页缓存
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelCachedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_CACHED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理标签页访问
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelVisitedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_VISITED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理其他标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelOthersTags ({ dispatch, commit, state }, tags) {
      return Promise.all([
        dispatch('DelOthersCachedTags', tags),
        dispatch('DelOthersVisitedTags', tags)
      ]).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理其他标签页缓存
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelOthersCachedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_OTHERS_CACHED_TAGS', tags)).then(
        () => ({
          stackTags: [...state.stackTags],
          cachedTags: [...state.cachedTags],
          visitedTags: [...state.visitedTags]
        })
      )
    },

    /**
     * @description 清理其他标签页访问
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelOthersVisitedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_OTHERS_VISITED_TAGS', tags)).then(
        () => ({
          stackTags: [...state.stackTags],
          cachedTags: [...state.cachedTags],
          visitedTags: [...state.visitedTags]
        })
      )
    },

    /**
     * @description 清理所有标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelAllTags ({ dispatch, commit, state }, tags) {
      return Promise.all([
        dispatch('DelAllCachedTags', tags),
        dispatch('DelAllVisitedTags', tags)
      ]).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理所有标签页缓存
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelAllCachedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_ALL_CACHED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理所有标签页访问
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelAllVisitedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('DEL_ALL_VISITED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 刷新所有标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    RefreshAllTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(dispatch('DelAllCachedTags')).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 更新所有标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    UpdateVisitedTags ({ dispatch, commit, state }, tags) {
      return Promise.resolve(commit('UPDATE_VISITED_TAGS', tags)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 删除当前标签页
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} tags
     * @return {Promise}
     */
    DelCurrentTag ({ dispatch, commit, state }, tag) {
      return Promise.all([
        dispatch('DelCachedTags', state.currentTag),
        dispatch('DelVisitedTags', state.currentTag)
      ]).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 注入标签页实例
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} node
     * @return {Promise}
     */
    InjectMultiple ({ dispatch, commit, state }, node) {
      return Promise.resolve(commit('INJECT_MULTIPLE', node)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    },

    /**
     * @description 清理标签页实例
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} state
     * @param {Object} node
     * @return {Promise}
     */
    ClearMultiple ({ dispatch, commit, state }, node) {
      return Promise.resolve(commit('CLEAR_MULTIPLE', node)).then(() => ({
        stackTags: [...state.stackTags],
        cachedTags: [...state.cachedTags],
        visitedTags: [...state.visitedTags]
      }))
    }
  }
}
