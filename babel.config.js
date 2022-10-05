const RUN_ENV = process.env.NODE_ENV
const RUN_PROD = ['production', 'prod'].includes(RUN_ENV)

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ],
    ...(RUN_PROD ? ['transform-remove-console'] : [])
  ]
}
