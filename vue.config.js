const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/webpackPluginConfig')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = dir => path.join(__dirname, dir)
const isEnvProd = process.env.NODE_ENV === 'production'
const isAnalyzer = process.env.VUE_APP_ANALYZER === 'true'

const assetsCDN = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    'vue-router': 'VueRouter'
  },
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js'
  ],
  css: []
}

const vueConfig = {
  publicPath: process.env.VUE_APP_BASE_URL,

  configureWebpack: {
    devtool: 'source-map',

    plugins: [
      ...(isEnvProd
        ? [
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['html', 'js', 'css'].join('|') + ')$'),
            deleteOriginalAssets: false,
            threshold: 10240,
            minRatio: 0.8
          }),
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true,
                pure_funcs: ['console.log']
              }
            },
            sourceMap: false,
            parallel: true
          })
        ]
        : []),

      ...(isAnalyzer
        ? [
          new BundleAnalyzer({
            analyzerPort: '8881',
            analyzerMode: 'server',
            generateStatsFile: true,
            statsOptions: { source: false }
          })
        ]
        : []),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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
      }
    },

    externals: isEnvProd ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    const imagesRule = config.module.rule('images')
    imagesRule.uses.clear()
    imagesRule
      .use('file-loader')
      .loader('url-loader')
      .options({
        limit: 10240,
        fallback: {
          loader: 'file-loader',
          options: {
            outputPath: 'static/images'
          }
        }
      })

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('SvgIcon')
      .test(/\/SvgIcon\/libs\//)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

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
