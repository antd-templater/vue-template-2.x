import Vue from 'vue'

import BaseForm from '@/components/BaseForm/index'
import BaseTree from '@/components/BaseTree/index'
import BaseTable from '@/components/BaseTable/index'
import BaseFilter from '@/components/BaseTable/filter'
import BaseSvgIcon from '@/components/BaseSvgIcon/index'
import BaseEllipsis from '@/components/BaseEllipsis/index'
import BaseIconSelect from '@/components/BaseIconSelect/index'
import BaseEditCellInput from '@/components/BaseEditCell/BaseEditCellInput'
import BaseEditCellSelect from '@/components/BaseEditCell/BaseEditCellSelect'
import BaseEditCellTextarea from '@/components/BaseEditCell/BaseEditCellTextarea'
import BaseEditCellTreeSelect from '@/components/BaseEditCell/BaseEditCellTreeSelect'
import BaseEditCellDatePicker from '@/components/BaseEditCell/BaseEditCellDatePicker'

/**
 * @description 全局注册组件
 * @date 2022-07-11
 * @lastModifiedBy
 * @lastModifiedDate
 */
Vue.component('BaseForm', BaseForm)
Vue.component('BaseTree', BaseTree)
Vue.component('BaseTable', BaseTable)
Vue.component('BaseFilter', BaseFilter)
Vue.component('BaseSvgIcon', BaseSvgIcon)
Vue.component('BaseEllipsis', BaseEllipsis)
Vue.component('BaseIconSelect', BaseIconSelect)
Vue.component('BaseEditCellInput', BaseEditCellInput)
Vue.component('BaseEditCellSelect', BaseEditCellSelect)
Vue.component('BaseEditCellTextarea', BaseEditCellTextarea)
Vue.component('BaseEditCellTreeSelect', BaseEditCellTreeSelect)
Vue.component('BaseEditCellDatePicker', BaseEditCellDatePicker)
