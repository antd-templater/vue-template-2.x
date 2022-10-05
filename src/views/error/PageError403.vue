<template>
  <a-result
    :title="title"
    :status="status"
    :sub-title="subTitle"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="toHome"
      >返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'PageError403',
  data () {
    return {
      title: '403',
      status: '403',
      subTitle: '抱歉，您无权访问此页!'
    }
  },
  methods: {
    /**
     * @description 前往首页
     * @returns {undefined}
     */
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
