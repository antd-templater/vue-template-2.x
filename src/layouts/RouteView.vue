<script>
import mixinApp from '@/mixins/mixinApp'
import mixinTags from '@/mixins/mixinTags'
import mixinExternal from '@/mixins/mixinExternal'

export default {
  name: 'RouteView',
  mixins: [mixinApp, mixinTags, mixinExternal],
  computed: {
    /**
     * @description 路由标识
     * @returns {String}
     */
    key () {
      const route = this.$route
      const meta = route.meta || {}
      const match = meta.match || 'path'
      const isExternal = match === 'external'
      const external = this.getExternal(route)
      return !isExternal ? route.fullPath : external
    }
  },
  render () {
    const key = this.key
    const multiTab = this.multiTab
    const keepAlive = this.keepAlive
    const cachedTags = this.cachedTags
    if (multiTab && keepAlive) {
      return (
        <keep-alive include={cachedTags}>
          <router-view key={key} />
        </keep-alive>
      )
    }
    return <router-view />
  }
}
</script>
