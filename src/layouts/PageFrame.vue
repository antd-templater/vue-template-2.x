<template>
  <section class="page-frame-container">
    <a-spin
      size="large"
      tip="正在加载访问中..."
      wrapperClassName="wrapper"
      :spinning="spinning"
    >
      <iframe
        ref="iframe"
        width="100%"
        height="100%"
        scrolling="yes"
        frameborder="0"
        :src="external"
      />
    </a-spin>
  </section>
</template>

<script>
import mixinExternal from '@/mixins/mixinExternal'

export default {
  name: 'PageFrame',
  mixins: [mixinExternal],
  data () {
    return {
      spinning: true
    }
  },
  computed: {
    /**
     * @description 外部链接
     * @returns {String}
     */
    external () {
      return this.getExternal(this.$route)
    }
  },
  mounted () {
    // 加载完成处理
    this.$refs.iframe.onload = () => {
      this.spinning = false
    }

    // 加载超时处理
    setTimeout(() => {
      this.spinning = false
    }, 10000)
  }
}
</script>

<style lang="less" scoped>
.page-frame-container {
  flex: 1 0 auto;
  flex-flow: column nowrap;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .wrapper {
    flex: 1 0 auto;
    flex-flow: column nowrap;
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    :deep(.ant-spin-container) {
      flex: 1 0 auto;
      flex-flow: column nowrap;
      display: flex;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }

  iframe {
    flex: 1 0 auto;
    flex-flow: column nowrap;
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
