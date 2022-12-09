import Vue from 'vue'

import {
  Carousel,
  Cascader,
  ConfigProvider,
  LocaleProvider,
  Layout,
  Rate,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  TreeSelect,
  AutoComplete,
  Card,
  Form,
  FormModel,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Pagination,
  Tree,
  Space,
  Empty,
  Timeline,
  message,
  notification
} from 'ant-design-vue'

/**
 * @description 组件库按需加载
 */
Vue.use(Carousel)
Vue.use(Cascader)
Vue.use(ConfigProvider)
Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Rate)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(TreeSelect)
Vue.use(AutoComplete)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(PageHeader)
Vue.use(Result)
Vue.use(Statistic)
Vue.use(Descriptions)
Vue.use(Pagination)
Vue.use(Tree)
Vue.use(Space)
Vue.use(Empty)
Vue.use(Timeline)
Vue.use(message)
Vue.use(notification)

/**
 * @description 注入Vue实例
 */
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$success = Modal.success
Vue.prototype.$warning = Modal.warning
Vue.prototype.$error = Modal.error
Vue.prototype.$info = Modal.info

/**
 * @description 通知框全局配置
 */
message.config({
  duration: 1.5
})
notification.config({
  duration: 1.5
})
