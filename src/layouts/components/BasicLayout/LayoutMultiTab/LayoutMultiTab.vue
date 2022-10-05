<script>
import mixinApp from '@/mixins/mixinApp'
import mixinTags from '@/mixins/mixinTags'
import mixinExternal from '@/mixins/mixinExternal'

export default {
  name: 'MultiTab',
  mixins: [mixinApp, mixinTags, mixinExternal],
  data () {
    return {
      activeKey: ''
    }
  },
  watch: {
    /**
     * @description 根据路由激活标签页
     * @param {Object} route
     * @returns {undefined}
     */
    $route (route) {
      this.add()
      this.active()
      const meta = route.meta || {}
      const match = meta.match || 'path'
      const isExternal = match === 'external'
      this.activeKey = !isExternal ? route.fullPath : this.getExternal(route)
    },

    /**
     * @description 激活标签页访问指定路由
     * @param {String} fullPath
     * @returns {undefined}
     */
    activeKey (fullPath) {
      // 优先在 route fullPath 里匹配
      for (const tag of this.visitedTags) {
        const meta = tag.meta || {}
        const match = meta.match || 'path'
        const isExternal = match === 'external'
        if (!isExternal && fullPath === tag.fullPath) {
          this.$router.push({ path: fullPath })
          return
        }
      }
      // 其次在 meta external 里匹配
      for (const tag of this.visitedTags) {
        const meta = tag.meta || {}
        const match = meta.match || 'path'
        const isExternal = match === 'external'
        if (isExternal && fullPath === meta.external) {
          this.$router.push({ path: tag.fullPath })
          return
        }
      }
      // 默认路由
      this.$router.push({ path: fullPath })
    }
  },
  created () {
    this.add()
    const route = this.$route
    const meta = route.meta || {}
    const match = meta.match || 'path'
    const isExternal = match === 'external'
    this.activeKey = !isExternal ? route.fullPath : this.getExternal(route)
    this.InjectMultiple(this)
  },
  methods: {
    /**
     * @description 标签页新增
     * @returns {Boolean}
     */
    add () {
      if (this.$route.name && this.multiTab) {
        const route = this.$route
        const meta = route.meta || {}
        const query = route.query || {}
        const external = this.getExternal(route)
        const tabTitle = query.title || meta.title
        const tags = {
          ...this.$route,
          meta: {
            ...meta,
            external,
            tabTitle
          }
        }
        if (tabTitle) {
          this.toggleTitle(`${this.domTitle} - ${tabTitle}`)
        } else {
          this.toggleTitle(this.domTitle)
        }
        if (this.keepAlive) {
          this.AddCachedTags(tags)
        }
        this.AddVisitedTags(tags)
      }
      return false
    },

    /**
     * @description 标签页激活
     * @returns {undefined}
     */
    active () {
      for (const tag of this.visitedTags) {
        const meta = tag.meta || {}
        const match = meta.match || 'path'
        const isExternal = match === 'external'
        if (
          !isExternal &&
          tag[match] === this.$route[match] &&
          tag.fullPath !== this.$route.fullPath
        ) {
          this.UpdateVisitedTags(this.$route)
          break
        }
      }
    },

    /**
     * @description 标签页获取
     * @param {Array <tag> || String} key
     * @returns {Array <tag>}
     */
    target (key) {
      const arr = []
      const keys = [].concat(key)
      for (const tag of this.visitedTags) {
        const meta = tag.meta || {}
        const match = meta.match || 'path'
        const isExternal = match === 'external'
        const fullPath = !isExternal ? tag.fullPath : meta.external
        if (keys.some(key => tag === key || fullPath === key)) {
          arr.push(tag)
        }
      }
      return arr
    },

    /**
     * @description 标签页删除
     * @param {Array <tag>} tags
     * @returns {undefined}
     */
    remove (tags) {
      if (tags.length > 0) {
        this.DelTags(tags).then(({ stackTags }) => {
          if (
            tags.some(tag => {
              const meta = tag.meta || {}
              const match = meta.match || 'path'
              const isExternal = match === 'external'
              const activeKey = !isExternal ? tag.fullPath : this.getExternal(tag)
              return activeKey === this.activeKey
            })
          ) {
            const tag = stackTags[0] || {}
            const meta = tag.meta || {}
            const match = meta.match || 'path'
            const isExternal = match === 'external'
            const fullPath = !isExternal ? tag.fullPath : meta.external
            this.activeKey = fullPath || '/'
          }
        })
      }
    },

    /**
     * @description 关闭当前
     * @param {Array <tag> || String} key
     * @returns {undefined}
     */
    closeThis (key) {
      if (this.visitedTags.length > 1) {
        const tags = this.target(key)
        const find = tag => tags.includes(tag)
        const tag = this.visitedTags.find(find)
        tag && this.remove([tag])
      } else {
        this.$message.info('这是最后一个标签了, 无法被关闭')
      }
    },

    /**
     * @description 关闭左侧
     * @param {Array <tag> || String} key
     * @returns {undefined}
     */
    closeLeft (key) {
      const arr = []
      const tags = this.target(key)
      const find = tag => tags.includes(tag)
      const limit = this.visitedTags.findIndex(find)
      if (limit > 0) {
        this.visitedTags.forEach((item, index) => {
          if (index < limit) {
            arr.push(item)
          }
        })
        this.remove(arr)
      } else {
        this.$message.info('左侧没有标签')
      }
    },

    /**
     * @description 关闭右侧
     * @param {Array <tag> || String} key
     * @returns {undefined}
     */
    closeRight (key) {
      const arr = []
      const tags = this.target(key)
      const find = tag => tags.includes(tag)
      const limit = this.visitedTags.findIndex(find)
      if (limit < this.visitedTags.length - 1) {
        this.visitedTags.forEach((item, index) => {
          if (index > limit) {
            arr.push(item)
          }
        })
        this.remove(arr)
      } else {
        this.$message.info('右侧没有标签')
      }
    },

    /**
     * @description 关闭其他
     * @param {Array <tag> || String} key
     * @returns {undefined}
     */
    closeOther (key) {
      const arr = []
      const tags = this.target(key)
      const find = tag => tags.includes(tag)
      const limit = this.visitedTags.findIndex(find)
      this.visitedTags.forEach((item, index) => {
        if (index !== limit) {
          arr.push(item)
        }
      })
      this.remove(arr)
    },

    /**
     * @description 关闭指定
     * @param {Array <tag> || String} key
     * @returns {undefined}
     */
    closeArray (key) {
      this.remove(this.target(key))
    }
  },
  render () {
    /**
     * @description 标签页操作
     * @param {Array <tag> || String} key
     * @param {String} action
     * @returns {undefined}
     */
    const onTagEdit = (key, action) => {
      action === 'remove' ? this.closeThis(key) : this[action](key)
    }

    /**
     * @description 右击操作
     * @param {String} keyPath
     * @returns {Menu} 组件
     */
    const menu = keyPath => {
      return (
        <a-menu
          {...{
            on: {
              click: ({ key, item, domEvent }) => {
                this[key](keyPath)
              }
            }
          }}
        >
          <a-menu-item key="closeThis">关闭当前标签</a-menu-item>
          <a-menu-item key="closeRight">关闭右侧标签</a-menu-item>
          <a-menu-item key="closeLeft">关闭左侧标签</a-menu-item>
          <a-menu-item key="closeOther">关闭其他标签</a-menu-item>
        </a-menu>
      )
    }

    /**
     * @description 下拉组件
     * @param {String} title
     * @param {String} keyPath
     * @returns {Dropdown} 组件
     */
    const pane = (title, keyPath) => {
      return (
        <a-dropdown overlay={menu(keyPath)} trigger={['contextmenu']}>
          <span style={{ userSelect: 'none' }} title={title.length > 20 ? title : false}>
            {title.length > 20 ? title.substr(0, 20) + '...' : title}
          </span>
        </a-dropdown>
      )
    }

    /**
     * @description 标签
     * @param {String} title
     * @param {String} keyPath
     * @returns {TabPane} 组件
     */
    const panes = this.visitedTags.map(tag => {
      const meta = tag.meta || {}
      const match = meta.match || 'path'
      const isExternal = match === 'external'
      const fullPath = !isExternal ? tag.fullPath : meta.external
      return (
        <a-tab-pane
          ref="tag"
          style={{ height: 0 }}
          tab={pane(meta.tabTitle || meta.title, fullPath)}
          key={fullPath}
          closable={this.visitedTags.length > 1}
        ></a-tab-pane>
      )
    })

    /**
     * @description 标签页组件
     * @returns {Tabs} 组件
     */
    return (
      <div class="layout-multi-tab">
        <div
          class={{ 'layout-multi-tab-fixed': this.fixedHeader }}
          style={{
            height: '38px',
            backgroundColor: '#ffffff',
            maxWidth: this.isTopMenu && this.contentWidth === 'Fixed' ? '1200px' : 'unset'
          }}
        >
          <a-tabs
            hideAdd
            type={'editable-card'}
            v-model={this.activeKey}
            tabBarStyle={{
              background: '#FFF',
              margin: 0,
              paddingLeft: '16px',
              paddingTop: '1px'
            }}
            {...{ on: { edit: onTagEdit } }}
          >
            {panes}
          </a-tabs>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.layout-multi-tab {
  height: 38px;

  .layout-multi-tab-fixed {
    width: 100%;
    height: 38px;
    position: fixed;
    top: var(--layout-header-height);
    z-index: 5;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15);
  }

  :deep(.ant-tabs) {
    height: 38px;
  }
  :deep(.ant-tabs-bar.ant-tabs-top-bar) {
    margin: 0 !important;
    padding: 5px 0 0 5px !important;
  }
  :deep(.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container) {
    height: 35px;
  }
  :deep(.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab) {
    height: 30px;
    line-height: 30px;
    margin: 0 4px;
    padding: 0 10px;
    border-radius: 0;

    &.ant-tabs-tab-active {
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
