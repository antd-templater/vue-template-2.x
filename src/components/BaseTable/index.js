import T from 'ant-design-vue/es/table/Table'
import Utils from './utils.js'

export default {
  name: 'BaseTable',
  props: {
    // 组件默认属性
    ...T.props,

    // 自定义
    data: {
      type: Function,
      required: true
    },
    // 是否立即查询
    immediate: {
      type: Boolean,
      default: true
    },
    // 不监听loading
    noloading: {
      type: Boolean,
      default: false
    },
    // 响应数据预处理
    handleData: {
      type: Function,
      default: function (response, Utils) {
        if (Utils.isObject(response)) {
          if (Utils.isObject(response.result)) {
            const data = response.result.data || []
            const pageNo = response.result.pageNo || 1
            const totalPage = response.result.totalPage || 0
            const totalCount = response.result.totalCount || 0

            return {
              data,
              pageNo,
              totalPage,
              totalCount
            }
          }
          if (Utils.isArray(response.result)) {
            const data = response.result || []
            const pageNo = 1
            const pageSize = data.length
            const totalPage = 0
            const totalCount = data.length

            return {
              data,
              pageNo,
              pageSize,
              totalPage,
              totalCount
            }
          }
        }
        if (Utils.isArray(response)) {
          const data = response || []
          const pageNo = 1
          const pageSize = data.length
          const totalPage = 0
          const totalCount = data.length

          return {
            data,
            pageNo,
            pageSize,
            totalPage,
            totalCount
          }
        }
      }
    },
    // 行选项配置
    rowSelection: {
      type: Object,
      default: null
    },
    // 查询清理展开项
    clearExpansion: {
      type: Boolean,
      default: true
    },
    // 查询清理选中项
    clearSelection: {
      type: Boolean,
      default: true
    },
    // 储存展开项 Keys
    expandedRowKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 显示分页组件
    showPagination: {
      type: [String, Boolean],
      default: 'auto'
    },
    // 分页信息
    pagination: {
      type: Object,
      default: function () {
        return {
          total: 0,
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
          hideOnSinglePage: false,
          showSizeChanger: true,
          showLessItems: true
        }
      }
    }
  },
  data () {
    return {
      // 列选项配置
      optionColumns: [],
      selectColumns: [],

      // 选中项数据
      selectedRows: [],
      selectedRowKeys: [],

      // 数据源
      oldDataSource: [],
      localDataSource: [],

      // 分页信息
      oldPagination: {},
      localPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '25', '30', '50', '100', '200'],
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
        hideOnSinglePage: false,
        showSizeChanger: true,
        showLessItems: true
      },
      localLoading: false,
      localFilters: {},
      localSorter: {}
    }
  },
  watch: {
    // 分页传参时预处理
    pagination: {
      handler (pagination) {
        if (!['auto', 'imitate', true].includes(this.showPagination)) {
          this.localPagination = false
          return
        }
        Object.assign(
          this.localPagination,
          {
            current: 1,
            pageSize: 10,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showLessItems: true
          },
          pagination
        )
      },
      immediate: true
    },
    // 显示分页时预处理
    showPagination: {
      handler (showPagination) {
        if (!['auto', 'imitate', true].includes(showPagination)) {
          this.localPagination = false
          return
        }
        Object.assign(
          this.localPagination,
          {
            current: 1,
            pageSize: 10,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条 (共 ${total} 条)`,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showLessItems: true
          },
          this.pagination
        )
      },
      immediate: true
    }
  },
  mounted () {
    this.immediate && this.loadData()
  },
  methods: {
    /**
     * @description 准备中
     * @param {Boolean} state
     * @return {undefined}
     */
    ready (state) {
      this.localLoading = state !== false
    },

    /**
     * @description 重置数据
     * @return {undefined}
     */
    reset () {
      this.localDataSource = this.oldDataSource
      this.localPagination = this.oldPagination
    },

    /**
     * @description 选择数据
     * @param {Array} data
     * @return {undefined}
     */
    select (data) {
      if (this.showPagination === 'imitate') {
        Object.assign({}, this.localPagination, {
          current: 1,
          total: data.length
        })
        this.localDataSource = [...data]
        return
      }
      this.localPagination = false
      this.localDataSource = [...data]
    },

    /**
     * @description 清空数据
     * @return {undefined}
     */
    clear () {
      if (['auto', 'imitate', true].includes(this.showPagination)) {
        Object.assign({}, this.localPagination, {
          current: 1,
          total: 0
        })
        this.localLoading = false
        this.oldPagination = this.localPagination
        this.oldDataSource = this.localDataSource = []
        return
      }
      this.localLoading = false
      this.oldPagination = this.localPagination = false
      this.oldDataSource = this.localDataSource = []
    },

    /**
     * @description 刷新数据
     * @param {Boolean} bool?
     * @param {Number} delay?
     * @return {undefined}
     */
    refresh (bool = false, delay = 0) {
      if (bool === true) {
        if (['auto', 'imitate', true].includes(this.showPagination)) {
          Object.assign(this.pagination, { current: 1 })
          Object.assign(this.localPagination, { current: 1 })

          delay > 0
            ? setTimeout(
              () => this.loadData({ ...this.localPagination }),
              delay
            )
            : this.loadData({ ...this.localPagination })

          return
        }

        Object.assign(this.pagination, { current: 1 })

        delay > 0
          ? setTimeout(() => this.loadData({ ...this.pagination }), delay)
          : this.loadData({ ...this.pagination })

        return
      }

      delay > 0 ? setTimeout(() => this.loadData(), delay) : this.loadData()
    },

    /**
     * @description 加载数据
     * @param {Object} pagination?
     * @param {Object} filters?
     * @param {Object} sorter?
     * @return {undefined}
     */
    loadData (pagination = {}, filters = {}, sorter = {}) {
      this.clearExpansion && this.clearExpanded()
      this.clearSelection && this.clearSelected()
      this.localLoading = !this.noloading

      const pageNo =
        (this.localPagination && this.localPagination.current) ||
        this.pagination.current
      const pageSize =
        (this.localPagination && this.localPagination.pageSize) ||
        this.pagination.pageSize

      const parameter = Object.assign(
        {
          pageNo: pagination.current || pageNo || 1,
          pageSize: pagination.pageSize || pageSize || 10
        },
        { sortField: sorter.field || this.localSorter.field },
        { sortOrder: sorter.order || this.localSorter.order },
        {
          ...this.localFilters,
          ...filters
        }
      )

      Promise.resolve(this.data(parameter))
        .then(response => {
          Promise.resolve(this.handleData(response, Utils))
            .then(result => {
              Object.assign(this.pagination, {
                total: result.totalCount,
                current: result.pageNo || parameter.pageNo || 1,
                pageSize: result.pageSize || parameter.pageSize
              })

              if (this.pagination.pageSize) {
                const remainder = this.pagination.total % this.pagination.pageSize
                const quotient = this.pagination.total / this.pagination.pageSize
                const totalValue = remainder
                  ? parseInt(quotient) + 1
                  : parseInt(quotient)
                if (
                  this.pagination.current > totalValue &&
                this.pagination.current > 1
                ) {
                  this.pagination.current--
                  this.loadData()
                  return
                }
              }

              if (['auto', 'imitate', true].includes(this.showPagination)) {
                Object.assign(this.localPagination, this.pagination)
              }

              // table 数据
              this.localDataSource = result.data
              this.oldDataSource = this.localDataSource
              this.oldPagination = this.localPagination
            })
        })
        .finally(() => {
          if (!this.noloading) {
            this.localLoading = false
          }

          if (this.rowKey) {
            if (
              this.defaultExpandedRowKeys &&
              this.defaultExpandedRowKeys.length > 0
            ) {
              for (const rowKey of this.defaultExpandedRowKeys) {
                if (
                  this.localDataSource.some(
                    record => record[this.rowKey] === rowKey
                  )
                ) {
                  if (!this.expandedRowKeys.includes(rowKey)) {
                    this.expandedRowKeys.push(rowKey)
                  }
                }
              }
            } else if (this.defaultExpandAllRows === true) {
              for (const record of this.localDataSource) {
                if (!this.expandedRowKeys.includes(record[this.rowKey])) {
                  this.expandedRowKeys.push(record[this.rowKey])
                }
              }
            }
          }
        })
    },

    /**
     * @description 已选中项
     * @param {Array <String>} selectedRowKeys
     * @param {Array <Object>} selectedRows
     * @return {undefined}
     */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },

    /**
     * @description 更新 table 展开项
     * @param {Array <String>} selectedRowKeys
     * @return {undefined}
     */
    updateExpand (expandedRowKeys) {
      if (Utils.isArray(this.expandedRowKeys) && Utils.isArray(expandedRowKeys)) {
        this.expandedRowKeys.splice(
          0,
          this.expandedRowKeys.length,
          ...expandedRowKeys
        )
      }
    },

    /**
     * @description 触发 table 选中事件
     * @param {Array <String>} selectedRowKeys
     * @param {Array <Object>} selectedRows
     * @return {undefined}
     */
    triggerSelect (selectedRowKeys, selectedRows) {
      if (this.rowSelection) {
        this.rowSelection.onChange(selectedRowKeys, selectedRows)
        this.updateSelect(selectedRowKeys, selectedRows)
      }
    },

    /**
     * @description 触发 table 展开事件
     * @param {Array <String>} selectedRowKeys
     * @return {undefined}
     */
    triggerExpand (expandedRowKeys) {
      this.updateExpand(expandedRowKeys)
    },

    /**
     * @description 清空 table 已选中项事件
     * @return {undefined}
     */
    clearSelected () {
      if (this.rowSelection) {
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },

    /**
     * @description 清空 table 展开项事件
     * @return {undefined}
     */
    clearExpanded () {
      this.triggerExpand([])
    },

    /**
     * @description 统计列字段
     * @param {Array} columns
     * @return {undefined}
     */
    initColumnField (columns) {
      for (const column of columns) {
        if (!Utils.isArray(column.children) || column.children.length === 0) {
          if (
            this.optionColumns.every(
              option => option.value !== column.dataIndex
            )
          ) {
            if (column.colFilter !== false) {
              this.optionColumns.push({
                label: column.title,
                value: column.dataIndex
              })
            }
          }
        } else if (column.children.length > 0) {
          this.initColumnField(column.children)
        }
      }
    },

    /**
     * @description 过滤列字段
     * @param {Array} columns
     * @return {undefined}
     */
    filterColumnField (columns) {
      const columnArr = []
      for (const column of columns) {
        if (!Utils.isArray(column.children) || column.children.length === 0) {
          if (
            this.optionColumns.some(
              option => option.value === column.dataIndex
            )
          ) {
            if (
              this.selectColumns.length === 0 ||
              this.selectColumns.some(
                select =>
                  select.value === column.dataIndex && select.filter !== false
              )
            ) {
              columnArr.push({
                ...column
              })
            }
          } else {
            columnArr.push({
              ...column
            })
          }
        } else {
          const children = this.filterColumnField(column.children)
          if (children.length > 0) {
            columnArr.push({
              ...column,
              children
            })
          }
        }
      }
      return columnArr
    }
  },
  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)

    /**
     * @description 更改事件
     * @param {Object} pagination
     * @param {Object} filters
     * @param {Object} sorter
     * @return {undefined}
     */
    const onChange = (pagination, filters, sorter) => {
      if (['auto', 'imitate', true].includes(this.showPagination)) {
        // 每页条数更改
        const changed = pagination.pageSize !== this.localPagination.pageSize
        this.localPagination.current = pagination.current = !changed
          ? pagination.current
          : 1
        this.localPagination.pageSize = pagination.pageSize

        // 数据长度不匹配时 ,自动翻页到上一页
        if (this.localPagination.pageSize) {
          const remainder =
            this.localPagination.total % this.localPagination.pageSize
          const quotient =
            this.localPagination.total / this.localPagination.pageSize
          const totalValue = remainder
            ? parseInt(quotient) + 1
            : parseInt(quotient)
          while (
            this.localPagination.current > totalValue &&
            this.localPagination.current > 1
          ) {
            this.localPagination.current--
          }
        }
      }
      this.localSorter = sorter
      this.localFilters = filters
      this.showPagination !== 'imitate' &&
        this.loadData(pagination, filters, sorter)
    }

    /**
     * @description 更改事件
     * @param {Array <String>} expandedRowKeys
     * @return {undefined}
     */
    const onExpandedRowsChange = expandedRowKeys => {
      this.updateExpand(expandedRowKeys)
    }

    // 处理 组件参数
    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`

      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }

      if (k === 'rowSelection') {
        if (this.rowSelection) {
          return (props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              Utils.isFunction(this[k].onChange) && this[k].onChange(selectedRowKeys, selectedRows)
            }
          })
        }
        return (props[k] = null)
      }

      if (k === 'getPopupContainer') {
        if (this[k] === undefined) {
          return (props[k] = () => this.$el)
        }
      }

      props[k] = this[k]

      return props[k]
    })

    // 处理 列字段
    this.initColumnField(props.columns)

    // 处理 列筛选
    props.columns = this.filterColumnField(props.columns)

    // 处理 列选项
    for (const option of this.optionColumns) {
      if (this.selectColumns.every(select => select.value !== option.value)) {
        this.selectColumns.push({
          value: option.value,
          filter: true
        })
      }
    }

    return (
      <a-table
        {...{ props, scopedSlots: { ...this.$scopedSlots }, on: { ...this.$listeners } }}
        onChange={onChange}
        onExpandedRowsChange={onExpandedRowsChange}
      >
        {Object.keys(this.$slots).map(name => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </a-table>
    )
  }
}
