<template>
  <div
    class="base-editable-cell-container"
    :class="{ editabled: editable }"
    :style="cellStyle.container"
  >
    <div
      v-if="!disabled && editable"
      class="base-editable-cell-input-wrapper"
      :class="{ 'disabled-icon': disabled || !check }"
      :style="cellStyle.inputWrapper"
    >
      <a-date-picker
        v-model="date"
        :mode="mode"
        :format="format"
        :style="cellStyle.input"
        :allowClear="allowClear"
        :inputReadOnly="inputReadOnly"
        class="base-editable-cell-input"
        @dblclick.native.stop="() => {}"
        @click.native.stop="() => {}"
        @change="doChange"
      />
      <a-button
        v-if="!disabled && check"
        class="base-editable-cell-button-check"
        icon="check"
        type="link"
        style="color: #0d8557"
        :style="cellStyle.check"
        @click.stop="doConfirm"
      />
    </div>
    <div
      v-else
      class="base-editable-cell-text-wrapper"
      :title="text"
      :style="cellStyle.textWrapper"
      :class="{ 'disabled-icon': disabled || !edit }"
      @click.stop="!disabled && edit && doEdit($event)"
    >
      <slot
        name="editableCellText"
        :text="text"
      >{{ text }}</slot>
      <a-button
        v-if="!disabled && edit"
        class="base-editable-cell-button-edit"
        icon="edit"
        type="link"
        :style="cellStyle.edit"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseEditCellDatePicker',
  props: {
    // 日期模式
    mode: {
      type: String,
      default: 'date'
    },
    // 格式化
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // 允许清理
    allowClear: {
      type: Boolean,
      default: false
    },
    // 是否只读
    inputReadOnly: {
      type: Boolean,
      default: false
    },
    // 文本值
    text: {
      type: [String, Number],
      default: ''
    },
    // 编辑按钮
    edit: {
      type: Boolean,
      default: true
    },
    // 确认按钮
    check: {
      type: Boolean,
      default: true
    },
    // 输入框激活
    opened: {
      type: Boolean,
      default: false
    },
    // 输入框状态
    status: {
      type: Boolean,
      default: false
    },
    // 是否同步
    synced: {
      type: Boolean,
      default: false
    },
    // 禁用与否
    disabled: {
      type: Boolean,
      default: false
    },
    // 单元格样式
    cellStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      date: this.doMoment(this.text),
      value: this.text,
      editable: false
    }
  },
  watch: {
    // 输入框状态更改处理
    status: {
      handler (status) {
        if (!this.disabled && status === false) {
          this.editable = false
        }
      }
    },
    // 输入框激活与否处理
    opened: {
      immediate: true,
      handler (opened) {
        if (this.disabled) {
          this.editable = false
        } else {
          this.date = this.doMoment(this.text)
          this.value = this.text
          this.editable = opened
        }
      }
    },
    // 输入框禁用与否处理
    disabled: {
      immediate: true,
      handler (disabled) {
        if (disabled) {
          this.editable = false
        } else {
          this.editable = this.opened
        }
      }
    }
  },
  created () {
    this.date = this.doMoment(this.text)
    this.value = this.text
  },
  methods: {
    /**
     * @description 转换为 Moment Date
     * @param {Date | String | Number} date
     * @returns {Moment}
     */
    doMoment (date) {
      return date ? moment(date) : null
    },

    /**
     * @description 转换为 指定格式的时间
     * @param {Date | String | Number} date
     * @returns {String}
     */
    doFormat (date) {
      return date
        ? moment(date).format(this.mode === 'time' ? 'YYYY-MM-DD HH:mm:ss' : this.format)
        : ''
    },

    /**
     * @description 更改事件
     * @param {Event} event
     * @returns {undefined}
     */
    doChange (event) {
      this.value = this.doFormat(this.date)
      this.$emit('change', this)
    },

    /**
     * @description 编辑操作
     * @param {Event} event
     * @returns {undefined}
     */
    doEdit (event) {
      const ev = event || window.event
      this.$emit('update:status', true)
      this.date = this.doMoment(this.text)
      this.value = this.text
      this.editable = true
      this.$emit('edit', this)
      ev.stopPropagation()
    },

    /**
     * @description 确认操作
     * @param {Event} event
     * @returns {undefined}
     */
    doConfirm (event) {
      const ev = event || window.event
      if (!this.opened) {
        this.editable = false
      }
      this.$emit('confirm', this)
      ev.stopPropagation()
    }
  }
}
</script>

<style lang="less" scoped>
.base-editable-cell-container {
  width: 100%;
  position: relative;
  &.editabled {
    min-width: 90px;
  }
  & > .base-editable-cell-input-wrapper {
    position: relative;
    &:not(.disabled-icon) {
      padding-right: 24px;
    }
    &.disabled-icon {
      padding-right: 5px;
    }
    & > .base-editable-cell-input {
      width: 100%;
    }
    & > .base-editable-cell-button-check {
      position: absolute;
      top: 52%;
      right: 2px;
      width: 20px;
      transform: translateY(-50%);
      cursor: pointer;
      border: none;
    }
  }
  & > .base-editable-cell-text-wrapper {
    min-height: 20px;
    &:not(.disabled-icon) {
      padding-right: 24px;
      cursor: pointer;
    }
    &.disabled-icon {
      padding-right: 2px;
    }
    width: 100%;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    & > .base-editable-cell-button-edit {
      position: absolute;
      top: 52%;
      right: 8px;
      width: 20px;
      transform: translateY(-50%);
      cursor: pointer;
      border: none;
    }
  }
}
</style>
