<script>
import mixinApp from '@/mixins/mixinApp'
import mixinRouter from '@/mixins/mixinRouter'

export default {
  name: 'LayoutBreadcrumb',
  mixins: [mixinApp, mixinRouter],
  computed: {
    /**
     * @description 面包屑标题
     * @returns {Array <breadcrumb>}
     */
    breadcrumbs () {
      const route = this.$route
      const routers = this.addRouters
      const breadcrumbs = this.findRoutes(route, routers)
      return breadcrumbs.length > 0 ? breadcrumbs.filter(route => route.meta) : [this.$route]
    }
  },
  methods: {
    /**
     * @description 筛选路由
     * @param {Object} route
     * @param {Array <route>} routers
     * @returns {Array <route>}
     */
    findRoutes (route, routers) {
      if (route) {
        for (const item of routers) {
          const byId = item.id && item.id === route.id
          const byPath = item.path && item.path === route.path

          if (byId || byPath) {
            return [item]
          }

          if (item.children) {
            const list = this.findRoutes(route, item.children)
            if (list.length > 0) {
              return [item, ...list]
            }
          }
        }
      }
      return []
    }
  },
  render () {
    return (
      <div class="layout-breadcrumb">
        <div
          class={{ 'layout-breadcrumb-fixed': this.fixedHeader }}
          style={{
            height: '38px',
            padding: '9px 0 0 12px',
            backgroundColor: '#ffffff',
            maxWidth: this.isTopMenu && this.contentWidth === 'Fixed' ? '1200px' : 'unset'
          }}
        >
          <a-breadcrumb>
            {this.breadcrumbs.map((route, index) => (
              <a-breadcrumb-item>
                {index === 0 && <a-icon type="home" />}
                <span>{route.meta.title}</span>
              </a-breadcrumb-item>
            ))}
          </a-breadcrumb>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.layout-breadcrumb {
  height: 38px;
  .layout-breadcrumb-fixed {
    width: 100%;
    height: 38px;
    position: fixed;
    top: var(--layout-header-height);
    z-index: 5;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
