<template>
  <a-drawer
    width="300"
    placement="right"
    :visible="visible"
    :closable="true"
    :getContainer="false"
    @close="visible = false"
  >
    <div class="layout-setting-drawer-content">
      <!-- 布局模式 -->
      <div :style="{ marginBottom: '24px' }">
        <h3 class="layout-setting-drawer-title">布局模式</h3>
        <div class="layout-setting-drawer-blockChecbox">
          <a-tooltip>
            <template slot="title">侧边栏导航</template>
            <div
              class="layout-setting-drawer-item"
              @click="toggleLayout('sidemenu')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
                alt="sidemenu"
              >
              <div
                v-if="isSideMenu"
                class="layout-setting-drawer-selectIcon"
              >
                <a-icon type="check"/>
              </div>
            </div>
          </a-tooltip>

          <a-tooltip>
            <template slot="title">顶部栏导航</template>
            <div
              class="layout-setting-drawer-item"
              @click="toggleLayout('topmenu')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
                alt="topmenu"
              >
              <div
                v-if="isTopMenu"
                class="layout-setting-drawer-selectIcon"
              >
                <a-icon type="check"/>
              </div>
            </div>
          </a-tooltip>
        </div>
      </div>

      <a-divider/>

      <!-- 选择风格 -->
      <div :style="{ marginBottom: '24px' }">
        <h3 class="layout-setting-drawer-title">选择风格</h3>
        <div class="layout-setting-drawer-blockChecbox">
          <a-tooltip>
            <template slot="title">暗色菜单风格</template>
            <div
              class="layout-setting-drawer-item"
              @click="toggleTheme('dark')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
                alt="dark"
              >
              <div
                v-if="navTheme === 'dark'"
                class="layout-setting-drawer-selectIcon"
              >
                <a-icon type="check"/>
              </div>
            </div>
          </a-tooltip>

          <a-tooltip>
            <template slot="title">亮色菜单风格</template>
            <div
              class="layout-setting-drawer-item"
              @click="toggleTheme('light')"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
                alt="light"
              >
              <div
                v-if="navTheme === 'light'"
                class="layout-setting-drawer-selectIcon"
              >
                <a-icon type="check"/>
              </div>
            </div>
          </a-tooltip>

          <a-tooltip>
            <template slot="title">暗黑菜单风格</template>
            <div
              class="layout-setting-drawer-item"
              style="cursor: not-allowed"
            >
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg"
                alt="realDark"
              >
              <div
                v-if="navTheme === 'realDark'"
                class="layout-setting-drawer-selectIcon"
              >
                <a-icon type="check"/>
              </div>
            </div>
          </a-tooltip>
        </div>
      </div>

      <!-- 选择主题 -->
      <div :style="{ marginBottom: '24px' }">
        <h3 class="layout-setting-drawer-title">选择主题</h3>

        <div style="padding: 5px; height: 25px">
          <a-tooltip
            class="layout-setting-drawer-theme-colors"
            v-for="(item, index) in colors"
            :key="index"
          >
            <template slot="title">{{ item.key }}</template>
            <a-tag
              :color="item.color"
              @click="toggleColor(item.color)"
            >
              <a-icon
                type="check"
                v-if="item.color === primaryColor"
              />
            </a-tag>
          </a-tooltip>
        </div>
      </div>

      <a-divider/>

      <!-- 导航设置 -->
      <div :style="{ marginTop: '30px' }">
        <h3 class="layout-setting-drawer-title">导航设置</h3>
        <a-list :split="false">
          <a-list-item>
            <a-select
              slot="actions"
              size="small"
              style="width: 80px"
              :value="contentWidth"
              @change="toggleContentWidth"
            >
              <a-select-option value="Fixed">固定</a-select-option>
              <a-select-option value="Fluid">流式</a-select-option>
            </a-select>
            <a-list-item-meta>
              <div slot="title">内容区域宽度</div>
            </a-list-item-meta>
          </a-list-item>

          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :checked="fixedHeader"
              @change="toggleFixedHeader"
            />
            <a-list-item-meta>
              <div slot="title">固定顶部导航</div>
            </a-list-item-meta>
          </a-list-item>

          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :disabled="isTopMenu"
              :checked="fixedSidebar"
              @change="toggleFixedSidebar"
            />
            <a-list-item-meta>
              <div slot="title">固定侧边菜单</div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>

      <a-divider/>

      <!-- 其他设置 -->
      <div :style="{ marginBottom: '24px' }">
        <h3 class="layout-setting-drawer-title">其他设置</h3>
        <a-list :split="false">
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :checked="colorWeak"
              @change="toggleWeak"
            />
            <a-list-item-meta>
              <div slot="title">色弱模式</div>
            </a-list-item-meta>
          </a-list-item>

          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :checked="multiTab"
              @change="toggleMultiTab"
            />
            <a-list-item-meta>
              <div slot="title">多页签模式</div>
            </a-list-item-meta>
          </a-list-item>

          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :checked="keepAlive"
              :disabled="!multiTab"
              @change="toggleKeepAlive"
            />
            <a-list-item-meta>
              <div slot="title">多页签缓存</div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>

      <a-divider/>

      <div :style="{ marginBottom: '24px' }">
        <a-alert
          type="warning"
          :style="{ marginBottom: '10px', fontSize: '14px', cursor: 'pointer' }"
          @click.native="lookSetting"
        >
          <span slot="message">
            <span>配置栏应在开发环境用于预览、调试</span>
            <br>
            <span>点击查看配置 - 游览器console界面</span>
          </span>
        </a-alert>
      </div>
    </div>

    <div
      slot="handle"
      class="layout-setting-drawer-handle"
      @click="visible = !visible"
    >
      <a-icon
        v-if="!visible"
        type="setting"
        style="color: #ffffff"
      />
      <a-icon
        v-else
        type="close"
        style="color: #ffffff"
      />
    </div>
  </a-drawer>
</template>

<script>
import {
  TOGGLE_WEAK,
  TOGGLE_COLOR,
  TOGGLE_MULTI_TAB,
  TOGGLE_KEEP_ALIVE,
  TOGGLE_FIXED_SIDEBAR
} from '@/store/mutation'

import mixinApp from '@/mixins/mixinApp'
import mixinTags from '@/mixins/mixinTags'
import mixinRouter from '@/mixins/mixinRouter'
import defaultSettings from '@/config/defaultSettings'
import { colors, updateColorTheme, updateColorWeak } from './settingsConfig'

export default {
  name: 'LayoutSettingDrawer',
  mixins: [mixinApp, mixinTags, mixinRouter],
  data () {
    return {
      colors,
      visible: false
    }
  },
  mounted () {
    if (this.colorWeak !== defaultSettings.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
    if (process.env.VUE_APP_PREVIEW === 'true') {
      updateColorTheme(this.primaryColor)
    }
  },
  methods: {
    /**
     * @description 切换主题色
     * @param {String} color
     * @returns {undefined}
     */
    toggleColor (color) {
      if (this.primaryColor !== color) {
        updateColorTheme(color)
        this.$store.commit(TOGGLE_COLOR, color)
      }
    },

    /**
     * @description 切换侧边栏固定
     * @param {String} color
     * @returns {undefined}
     */
    toggleFixedSidebar (fixed) {
      if (this.isTopMenu) {
        this.$store.commit(TOGGLE_FIXED_SIDEBAR, false)
        return
      }
      this.$store.commit(TOGGLE_FIXED_SIDEBAR, fixed)
    },

    /**
     * @description 切换色弱模式
     * @param {Boolean} checked
     * @returns {undefined}
     */
    toggleWeak (checked) {
      updateColorWeak(checked)
      this.$store.commit(TOGGLE_WEAK, checked)
    },

    /**
     * @description 切换多标签页
     * @param {Boolean} checked
     * @returns {undefined}
     */
    toggleMultiTab (checked) {
      if (!checked) {
        this.$store.dispatch('DelAllTags')
      }
      this.$store.commit(TOGGLE_MULTI_TAB, checked)
    },

    /**
     * @description 切换缓存
     * @param {Boolean} checked
     * @returns {undefined}
     */
    toggleKeepAlive (checked) {
      if (!checked) {
        this.DelAllCachedTags()
        this.$store.commit(TOGGLE_KEEP_ALIVE, checked)
        return
      }
      const findChild = (menus, cached) => {
        if (Array.isArray(menus)) {
          for (const menu of menus) {
            cached.push({ ...menu })
            findChild(menu.children, cached)
          }
        }
        return cached
      }
      const find = item => item.path === '/'
      const router = this.addRouters.find(find)
      this.AddCachedTags(findChild(router.children, []))
      this.$store.commit(TOGGLE_KEEP_ALIVE, checked)
    },

    /**
     * @description 查看配置
     * @param {Boolean}
     * @returns {undefined}
     */
    lookSetting () {
      console.info(
        `export default {\n  title: 'Antd Template',\n  colorWeak: ${this.colorWeak},\n  primaryColor: '${this.primaryColor}',\n  navTheme: '${this.navTheme}',\n  layout: '${this.layoutMode}',\n  multiTab: ${this.multiTab},\n  keepAlive: ${this.keepAlive},\n  autoHideHeader: ${this.autoHideHeader},\n  fixedHeader: ${this.fixedHeader},\n  fixedSidebar: ${this.fixedSidebar},\n  contentWidth: '${this.contentWidth}',\n  storageOptions: {\n    name: 'ls',\n    storage: 'local',\n    namespace: '__'\n  }\n}`
      )
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.ant-drawer .ant-drawer-body) {
  padding: 50px 20px 10px;
}

.layout-setting-drawer-content {
  .layout-setting-drawer-blockChecbox {
    width: 100%;
    display: flex;
    .layout-setting-drawer-item {
      margin-right: 16px;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      img {
        width: 48px;
        height: auto;
      }
      .layout-setting-drawer-selectIcon {
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-left: 24px;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .layout-setting-drawer-theme-colors {
    float: left;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    i {
      font-size: 14px;
    }
  }
}
.layout-setting-drawer-handle {
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  background: #1890ff;
  border-radius: 4px 0 0 4px;
  position: absolute;
  top: 240px;
  right: 300px;
  z-index: 1001;
  cursor: pointer;
  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
