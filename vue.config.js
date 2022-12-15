const path = require('path')
const webpack = require('webpack')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const createThemeColorReplacerPlugin = require('./config/webpackPluginConfig')

const resolve = dir => path.join(__dirname, dir)
const isEnvProd = process.env.NODE_ENV === 'production'
const isAnalyzer = process.env.VUE_APP_ANALYZER === 'true'
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const assetsCDN = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    'vue-router': 'VueRouter'
  },
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@1.2.1/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js'
  ],
  css: []
}

const vueConfig = {
  publicPath: process.env.VUE_APP_BASE_URL,

  configureWebpack: {
    devtool: 'source-map',

    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),

      ...(
        isEnvProd
          ? [
            new CompressionWebpackPlugin({
              filename: '[path][base].gz[query]',
              algorithm: 'gzip',
              test: new RegExp('\\.(' + ['html', 'js', 'css'].join('|') + ')$'),
              deleteOriginalAssets: false,
              threshold: 10240,
              minRatio: 0.8
            })
          ]
          : []
      ),

      ...(
        isAnalyzer
          ? [
            new BundleAnalyzer({
              analyzerPort: 'auto',
              analyzerMode: 'server',
              generateStatsFile: true,
              statsOptions: { source: false }
            })
          ]
          : []
      )
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            chunks: 'all',
            name: 'vendors',
            test: /\/node_modules\//,
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 10
          },
          antDesign: {
            chunks: 'all',
            name: 'ant-design',
            test: /\/node_modules\/@ant-design\//,
            minChunks: 1,
            minSize: 0,
            priority: 20
          },
          antDesignVue: {
            chunks: 'all',
            name: 'ant-design-vue',
            test: /\/node_modules\/ant-design-vue\//,
            minChunks: 1,
            minSize: 0,
            priority: 30
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c|le)ss$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      minimize: isEnvProd,
      minimizer: isEnvProd ? [new TerserWebpackPlugin()] : []
    },

    externals: isEnvProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')

    if (isEnvProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#4557ff',
          // 'link-color': '#4557ff',
          // 'success-color': '#29d084',
          // 'warning-color': '#fda945',
          // 'error-color': '#f44848',
          // 'font-size-base': '14px',
          // 'heading-color': '#30323c',
          // 'text-color': '#545665',
          // 'text-color-secondary': '#808399',
          // 'disabled-color': '#afb3cc',
          // 'border-radius-base': '4px',
          // 'border-color-base': '#e3e5f1',
          // 'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
          // 'ant-pro-prefix': 'ant-pro',
          // 'ant-global-sider-zindex': '106',
          // 'ant-global-header-zindex': '105'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888/api',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: []
}

if (process.env.VUE_APP_PREVIEW === 'true') {
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
