<template>
  <a-config-provider :locale="locale">
    <div
      id="app"
      :class="[`app-${mediaMark}`, `app-${layoutMode}`, { 'app-mobile': isMobile }]"
    >
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import mixinApp from '@/mixins/mixinApp'

export default {
  mixins: [mixinApp],
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="less">
#app > .ant-layout {
  height: 100vh;
  min-height: 100vh;
}

#app.app-mobile > .ant-layout .page-view-container > div,
#app.app-mobile > .ant-layout .route-view-container > div,
#app.app-topmenu > .ant-layout .page-view-container > div,
#app.app-topmenu > .ant-layout .route-view-container > div {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px 0 12px;
  position: absolute;
}

#app.app-mobile > .ant-layout .page-view-container > section,
#app.app-mobile > .ant-layout .route-view-container > section,
#app.app-topmenu > .ant-layout .page-view-container > section,
#app.app-topmenu > .ant-layout .route-view-container > section {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: calc(100% - 40px);
  padding: 24px 0 12px;
  position: absolute;
}
</style>
