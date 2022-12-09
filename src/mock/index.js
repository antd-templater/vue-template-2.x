/**
 * @description Mock拦截
 */
const Mock = require('mockjs2')

// 认证接口
require('./auth/login')
require('./auth/logout')
require('./auth/modifyPassword')

// 基础接口
require('./base/getOptionById')
require('./base/getTreeById')

// 字典接口
require('./dictionary/addBaseClass')
require('./dictionary/addBaseCode')
require('./dictionary/getBaseClass')
require('./dictionary/getBaseCode')
require('./dictionary/modifyBaseClass')
require('./dictionary/modifyBaseCode')
require('./dictionary/deleteBaseClass')
require('./dictionary/deleteBaseCode')

// 组织接口
require('./organize/addOrganizeInfo')
require('./organize/getOrganizeInfoTree')
require('./organize/getOrganizeInfoList')
require('./organize/modifyOrganizeInfo')
require('./organize/deleteOrganizeInfo')

// 员工接口
require('./person/addPersonInfo')
require('./person/getPersonInfoList')
require('./person/modifyPersonInfo')
require('./person/deletePersonInfo')

// 资源接口
require('./resource/addResourceInfo')
require('./resource/getResourceInfoList')
require('./resource/getResourceMenuAll')
require('./resource/getResourceMenuByRole')
require('./resource/getResourceButtonByRole')
require('./resource/modifyResoureInfoByRoleId')
require('./resource/modifyResourceInfo')
require('./resource/deleteResourceInfo')

// 角色接口
require('./role/addRoleInfo')
require('./role/getRoleInfoList')
require('./role/getRoleInfoByPages')
require('./role/getRoleInfoByUserNo')
require('./role/modifyRoleInfo')
require('./role/deleteRoleInfo')

// 用户接口
require('./user/addUserInfo')
require('./user/getUserInfo')
require('./user/getUserMenu')
require('./user/getUserInfoList')
require('./user/modifyUserInfo')
require('./user/deleteUserInfo')

Mock.setup({
  timeout: 500
})
