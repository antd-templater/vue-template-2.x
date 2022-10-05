import moment from 'moment'

/**
 * @description 组件默认配置
 * @author lin pengteng
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
export default {
  ARate: {
    type: 'ARate',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return value && Utils.isNumber(+value) ? +value : ''
      },
      output (value, { Utils }) {
        return value && Utils.isNumber(+value) ? +value : ''
      }
    },
    grid: {}
  },

  AInput: {
    type: 'AInput',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      },
      output (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ASwitch: {
    type: 'ASwitch',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: false,
      output: ''
    },
    transfer: {
      input (value, { Utils }) {
        if (Utils.isBoolean(value)) {
          return value
        }
        return ['Y', 'y'].includes(value)
      },
      output (value, { Utils }) {
        return value === true ? 'Y' : 'N'
      }
    },
    grid: {}
  },

  ASelect: {
    type: 'ASelect',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input ({ Utils, col }) {
        return ['multiple', 'combobox'].includes(col.attrs.mode) ? [] : undefined
      },
      output: undefined
    },
    transfer: {
      input (value, { Utils, col }) {
        if (['multiple', 'combobox'].includes(col.attrs.mode)) {
          if (Utils.isString(value)) {
            return value.trim() ? value.trim().split(',') : []
          }
          return Utils.isArray(value) ? value : []
        }
        return Utils.isNumber(value) || Utils.isString(value) ? value : undefined
      },
      output (value, { Utils, col }) {
        if (['multiple', 'combobox'].includes(col.attrs.mode)) {
          if (Utils.isArray(value)) {
            return value.join(',')
          }
          return Utils.isString(value) ? value.trim() : ''
        }
        return Utils.isNumber(value) || Utils.isString(value) ? value : undefined
      }
    },
    grid: {}
  },

  ATreeSelect: {
    type: 'ATreeSelect',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input ({ Utils, col }) {
        return col.attrs.multiple === true ? [] : undefined
      },
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (col.attrs.multiple === true) {
          if (Utils.isString(value)) {
            return value.trim() ? value.trim().split(',') : []
          }
          return Utils.isArray(value) ? value : []
        }
        return Utils.isNumber(value) || Utils.isString(value) ? value : undefined
      },
      output (value, { Utils, col }) {
        if (col.attrs.multiple === true) {
          if (Utils.isArray(value)) {
            return value.join(',')
          }
          return Utils.isString(value) ? value.trim() : ''
        }
        return Utils.isNumber(value) || Utils.isString(value) ? value : undefined
      }
    },
    grid: {}
  },

  ARadioGroup: {
    type: 'ARadioGroup',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        return value !== undefined && value !== null ? value : ''
      },
      output (value, { Utils, col }) {
        return value !== undefined && value !== null ? value : ''
      }
    },
    grid: {}
  },

  ACheckboxGroup: {
    type: 'ACheckboxGroup',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input ({ Utils, col }) {
        return []
      },
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (Utils.isString(value)) {
          return value.trim() ? value.trim().split(',') : []
        }
        return Utils.isArray(value) ? value : []
      },
      output (value, { Utils, col }) {
        if (Utils.isArray(value)) {
          return value.join(',')
        }
        return Utils.isString(value) ? value.trim() : ''
      }
    },
    grid: {}
  },

  AInputPassword: {
    type: 'AInputPassword',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      },
      output (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  AAutoComplete: {
    type: 'AAutoComplete',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      },
      output (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  AInputNumber: {
    type: 'AInputNumber',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return value && Utils.isNumber(+value) ? +value : ''
      },
      output (value, { Utils }) {
        return value && Utils.isNumber(+value) ? +value : ''
      }
    },
    grid: {}
  },

  ARangePicker: {
    type: 'ARangePicker',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: [],
      output: []
    },
    transfer: {
      input (value, { Utils, col }) {
        if (Utils.isArray(value)) {
          return value
            .filter(every => Utils.isString(every))
            .map(every => Utils.isString(every)
              ? moment(every, col.attrs.format || 'YYYY-MM-DD')
              : null
            )
        }
        return []
      },
      output (value, { Utils, col }) {
        if (Utils.isArray(value)) {
          return value.map(every =>
            Utils.isObject(every)
              ? every.format(col.attrs.valueFormat || col.attrs.format || 'YYYY-MM-DD')
              : ''
          )
        }
        return []
      }
    },
    grid: {}
  },

  AYearPicker: {
    type: 'AYearPicker',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (value === undefined || Utils.isNumber(value) || Utils.isString(value)) {
          if (value) {
            return moment(value, col.attrs.format || 'YYYY')
          }
          return null
        }
        return value
      },
      output (value, { Utils, col }) {
        if (Utils.isObject(value)) {
          return value.format(col.attrs.valueFormat || col.attrs.format || 'YYYY')
        }
        return Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  AMonthPicker: {
    type: 'AMonthPicker',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (value === undefined || Utils.isNumber(value) || Utils.isString(value)) {
          if (value) {
            return moment(value, col.attrs.format || 'YYYY-MM')
          }
          return null
        }
        return value
      },
      output (value, { Utils, col }) {
        if (Utils.isObject(value)) {
          return value.format(col.attrs.valueFormat || col.attrs.format || 'YYYY-MM')
        }
        return Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ADatePicker: {
    type: 'ADatePicker',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (value === undefined || Utils.isNumber(value) || Utils.isString(value)) {
          if (value) {
            return moment(value, col.attrs.format || (col.attrs.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'))
          }
          return null
        }
        return value
      },
      output (value, { Utils, col }) {
        if (Utils.isObject(value)) {
          return value.format(col.attrs.valueFormat || col.attrs.format || (col.attrs.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'))
        }
        return Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ATimePicker: {
    type: 'ATimePicker',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: null,
      output: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (value === undefined || Utils.isNumber(value) || Utils.isString(value)) {
          if (value) {
            return moment(value, col.attrs.format || (col.attrs.use12Hours ? 'h:mm:ss' : 'HH:mm:ss'))
          }
          return null
        }
        return value
      },
      output (value, { Utils, col }) {
        if (Utils.isObject(value)) {
          return value.format(col.attrs.valueFormat || col.attrs.format || (col.attrs.use12Hours ? 'h:mm:ss' : 'HH:mm:ss'))
        }
        return Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ATextarea: {
    type: 'ATextarea',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      output: ''
    },
    transfer: {
      input (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      },
      output (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ACascader: {
    type: 'ACascader',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: [],
      ouput: ''
    },
    transfer: {
      input (value, { Utils, col }) {
        if (Utils.isArray(value)) {
          return value
        }
        if (Utils.isString(value)) {
          return value.split(col.attrs.separator || '/')
        }
        return []
      },
      output (value, { Utils, col }) {
        if (Utils.isArray(value)) {
          return value.join(col.attrs.separator || '/')
        }
        return Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  },

  ASearch: {
    type: 'ASearch',
    slot: '',
    field: '',
    label: '',
    decorator: {},
    attrs: {},
    events: {},
    default: {
      input: '',
      ouput: ''
    },
    transfer: {
      input (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      },
      output (value, { Utils }) {
        return Utils.isNumber(value) || Utils.isString(value) ? value : ''
      }
    },
    grid: {}
  }
}
