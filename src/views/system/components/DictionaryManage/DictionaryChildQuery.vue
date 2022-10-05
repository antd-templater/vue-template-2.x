<template>
  <section class="dictionary-child-query-container">
    <a-form
      layout="inline"
      label-width-auto
    >
      <div class="flex-row-none">
        <div
          class="flex-row-none"
          style="width: 350px"
        >
          <a-form-item
            label="代码名称"
            style="margin-bottom: 0"
          >
            <a-input-search
              v-model="queryParam.codeName"
              placeholder="请输入代码名称"
              allowClear
              @search="doQuery"
            >
              <a-button
                slot="enterButton"
                icon="search"
                type="link"
                style="background-color: #ffffff; border: solid 1px #d9d9d9"
              />
            </a-input-search>
          </a-form-item>
        </div>

        <div
          class="flex-row-auto"
          style="justify-content: flex-end"
        >
          <div style="flex: 0 0 auto">
            <a-button
              type="primary"
              @click="doAdd"
            >新增</a-button>
          </div>
        </div>
      </div>
    </a-form>
  </section>
</template>

<script>
export default {
  name: 'DictionaryChildQuery',
  data () {
    return {
      queryParam: {
        codeName: '',
        activity: ''
      }
    }
  },
  methods: {
    /**
     * @description 通知新增
     * @returns {undefined}
     */
    doAdd () {
      this.$emit('add')
    },

    /**
     * @description 通知查询
     * @returns {undefined}
     */
    doQuery () {
      this.$emit('query', { ...this.queryParam })
    },

    /**
     * @description 重置查询
     * @param {Boolean} query
     * @returns {Object}
     */
    doReset (query) {
      this.queryParam = {
        codeName: '',
        activity: ''
      }
      if (query === true) {
        this.doQuery()
      }
      return {
        ...this.queryParam
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dictionary-child-query-container {
  width: 100%;
  height: auto;
  padding: 0 5px;
  .form-inline-more {
    display: flex;
    width: 100%;
    padding: 12px 15px;
    margin-top: 8px;
    background: #fafafd;
    border: 1px solid #e3e5f1;
    border-radius: 4px;
    position: relative;
    &::before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: -8px;
      left: 352px;
      border: solid 8px #e3e5f1;
      border-top: none;
      border-left-color: transparent;
      border-right-color: transparent;
    }
    &::after {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: -6px;
      left: 354px;
      border: solid 6px #fafafd;
      border-top: none;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
}
</style>
