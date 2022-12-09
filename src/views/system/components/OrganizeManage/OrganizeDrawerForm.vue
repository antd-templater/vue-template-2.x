<template>
  <section class="organize-drawer-form-container">
    <s-form
      ref="form"
      :grid="grid"
      :watch="watch"
      :attrs="attrs"
      :groups="groups"
      :options="options"
      :disabled="disabled"
      :readonly="readonly"
      :spinning="spinning"
    />
  </section>
</template>

<script>
import { requestBuilder } from '@/utils/util'
import * as organizeApi from '@/api/organize'

// 导入表单配置
import FormConfig from './OrganizeDrawerForm.js'

export default {
  name: 'OrganizeDrawerForm',
  mixins: [FormConfig],
  props: {
    queryOptions: {
      type: Object,
      default: function () {
        return {
          orgTree: [],
          isOrg: []
        }
      }
    },
    rootNodes: {
      type: Array,
      default: function () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      action: '',
      record: {}
    }
  },
  watch: {
    loading: {
      handler (loading) {
        this.spinning = !!loading
      },
      immediate: true
    },
    spinning: {
      handler (spinning) {
        this.$emit('update:loading', !!spinning)
      }
    }
  },
  methods: {
    /**
     * @description 表单重置
     * @param {Array}
     * @returns {undefined}
     */
    resetFields () {
      return this.$refs.form.resetFields(...arguments)
    },

    /**
     * @description 表单赋值
     * @param {Object}
     * @returns {undefined}
     */
    setFieldsValue () {
      this.$refs.form.setFieldsValue(...arguments)
    },

    /**
     * @description 表单取值 - 多个字段
     * @param {Array}
     * @returns {Object}
     */
    getFieldsValue () {
      return this.$refs.form.getFieldsValue(...arguments)
    },

    /**
     * @description 表单取值 - 单个字段
     * @param {String}
     * @returns {String}
     */
    getFieldValue () {
      return this.$refs.form.getFieldValue(...arguments)
    },

    /**
     * @description 表单校验
     * @param {Function}
     * @returns {undefined}
     */
    validateFields () {
      return this.$refs.form.validateFields(...arguments)
    },

    /**
     * @description 表单渲染
     * @param {String} action
     * @param {Object} record
     * @returns {undefined}
     */
    doCreateForm (action = '', record = {}) {
      this.action = action
      this.record = record
      this.resetFields()
      this.$nextTick(() => this.setFieldsValue(record))
    },

    /**
     * @description 表单销毁
     * @returns {undefined}
     */
    doDestroyForm () {
      this.action = ''
      this.record = {}
      this.resetFields()
    },

    /**
     * @description 删除数据
     * @param {Array} records
     * @returns {Promise}
     */
    doDeleteData (records) {
      return organizeApi.deleteOrganizeInfo(requestBuilder('delete', records)).then(res => {
        if (res.code !== '0000') {
          this.$notification.error({
            message: '系统消息',
            description: res.message || '删除失败!'
          })
          return Promise.reject(res)
        }
        this.$notification.success({
          message: '系统消息',
          description: '删除成功!'
        })
      })
    },

    /**
     * @description 校验数据
     * @param {Object} record
     * @returns {Promise}
     */
    doValidateData (record) {
      return new Promise((resolve, reject) => {
        this.validateFields(errors => {
          if (errors) {
            this.$message.error('请完善表单信息!')
            reject(new Error('请完善表单信息!'))
            return
          }

          const data = {
            ...record,
            ...this.getFieldsValue()
          }

          resolve([
            {
              ...data,
              parentOrgId: data.parentOrgId || '0'
            }
          ])
        })
      })
    },

    /**
     * @description 更新数据
     * @param {Object} record
     * @returns {Promise}
     */
    doUpdateData (record) {
      return this.doValidateData(record).then(records => {
        if (!this.spinning) {
          // 更新中
          this.spinning = true

          // 参数处理
          const notice = {
            error: this.action === 'insert' ? '新增失败!' : '更新失败!',
            success: this.action === 'insert' ? '新增成功!' : '更新成功!'
          }

          // 调用接口
          const promise =
            this.action === 'insert'
              ? organizeApi.addOrganizeInfo(requestBuilder(this.action, records[0]))
              : organizeApi.modifyOrganizeInfo(requestBuilder(this.action, records[0]))

          // 返回结果
          return promise
            .then(res => {
              if (res.code !== '0000') {
                this.$notification.error({
                  message: '系统消息',
                  description: res.message || notice.error
                })
                return Promise.reject(res)
              }
              this.$notification.success({
                message: '系统消息',
                description: notice.success
              })
              return Promise.resolve(records[0])
            })
            .finally(() => {
              this.spinning = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.s-form-container) {
  .ant-form.ant-form-horizontal {
    .ant-form-item > .ant-form-item-label {
      width: 54px;
      margin-right: 5px;
    }
  }
}
</style>
