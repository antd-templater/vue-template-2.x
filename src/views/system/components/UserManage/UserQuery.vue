<template>
  <section class="user-query-container">
    <a-form
      layout="inline"
      label-width-auto
    >
      <div class="flex-row-none">
        <div
          class="flex-row-none"
          style="width: 345px"
        >
          <a-form-item
            label="用户名"
            style="margin-bottom: 0"
          >
            <a-input-search
              v-model="queryParam.userNo"
              placeholder="请输入用户名"
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

        <div class="flex-row-auto">
          <div style="flex: 1 1 auto">
            <a-button
              icon="filter"
              @click="doFilter"
            />
          </div>
          <div style="flex: 0 0 auto">
            <a-button
              icon="plus"
              type="primary"
              @click="doAdd"
            >新增</a-button>
          </div>
        </div>
      </div>

      <div
        v-if="filterVisible"
        class="form-inline-more"
      >
        <div
          class="flex-row-none"
          style="width: 210px; margin-right: 10px"
        >
          <a-form-item
            label="状态"
            style="margin-bottom: 0"
          >
            <a-select
              v-model="queryParam.activity"
              placeholder="请选择用户状态"
              @change="doQuery"
            >
              <a-select-option value>全部</a-select-option>
              <a-select-option value="Y">启用</a-select-option>
              <a-select-option value="N">禁用</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div
          class="flex-row-none"
          style="width: 240px; margin-right: 10px"
        >
          <a-form-item
            label="用户姓名"
            style="margin-bottom: 0"
          >
            <a-input
              v-model="queryParam.userName"
              placeholder="请输入用户姓名"
              allowClear
              @pressEnter="doQuery"
            />
          </a-form-item>
        </div>

        <div
          class="flex-row-none"
          style="width: 240px"
        >
          <a-form-item
            label="手机号"
            style="margin-bottom: 0"
          >
            <a-input
              v-model="queryParam.mobilePhone"
              placeholder="请输入手机号"
              allowClear
              @pressEnter="doQuery"
            />
          </a-form-item>
        </div>

        <div class="flex-row-auto">
          <a-button
            type="primary"
            style="margin: 0 8px"
            @click="doQuery"
          >查询</a-button>
          <a-button
            style="margin: 0 8px"
            @click="doReset(true)"
          >重置</a-button>
        </div>
      </div>
    </a-form>
  </section>
</template>

<script>
export default {
  name: 'UserQuery',
  data () {
    return {
      queryParam: {
        userNo: '',
        userName: '',
        mobilePhone: '',
        activity: ''
      },
      filterVisible: false
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
     * @description 切换筛选
     * @returns {undefined}
     */
    doFilter () {
      this.filterVisible = !this.filterVisible
    },

    /**
     * @description 重置查询
     * @param {Boolean} query
     * @returns {Object}
     */
    doReset (query) {
      this.queryParam = {
        userNo: '',
        userName: '',
        mobilePhone: '',
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
.user-query-container {
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
