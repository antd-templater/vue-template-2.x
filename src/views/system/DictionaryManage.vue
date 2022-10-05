<template>
  <section class="section-container">
    <div class="section-left-container">
      <dictionary-main
        ref="main"
        @linkage="linkageQuery"
      />
    </div>
    <div class="section-right-container">
      <dictionary-child ref="child"/>
    </div>
  </section>
</template>

<script>
import DictionaryMain from './components/DictionaryManage/DictionaryMain'
import DictionaryChild from './components/DictionaryManage/DictionaryChild'

export default {
  name: 'DictionaryManage',
  components: {
    DictionaryMain,
    DictionaryChild
  },
  methods: {
    /**
     * @description 联动查询
     * @param {Object} options
     * @returns {undefined}
     */
    linkageQuery (options) {
      this.$refs.child.doLinkage(options)
    }
  }
}
</script>

<style lang="less" scoped>
.section-container {
  display: flex;
  flex-flow: row nowrap;
  width: calc(100% - 48px);
  height: calc(100% - 36px);
  padding: 24px 24px 12px;
  position: absolute;
  .section-left-container {
    flex: 0 0 auto;
    width: 480px;
    height: 100%;
    margin-right: 24px;
    transition: width 0.25s ease;
    overflow: hidden;
  }
  .section-right-container {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: calc(100% - 450px);
    height: 100%;
    position: relative;
  }
}
</style>
