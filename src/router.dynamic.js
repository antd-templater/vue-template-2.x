import {
  generatorLayoutRouter,
  generatorViewsRouter
} from '@/router/generator-routers'

/**
 * @description 路由与组件的映射
 */
export default {
  ...generatorLayoutRouter(
    require.context('@/layouts', false, /^((\.{0,2}\/(?!components\/|_\w*\/?))[^/]+)+\.vue$/i)
  ),

  ...generatorViewsRouter(
    require.context('@/views', true, /^((\.{0,2}\/(?!components\/|_\w*\/?))[^/]+)+\.vue$/i)
  )
}
