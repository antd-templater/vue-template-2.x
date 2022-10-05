module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-tabs': 0,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-delete-var': 2,
    'no-mixed-operators': 0,
    'template-curly-spacing': 0,
    'generator-star-spacing': 0,
    'vue/no-parsing-error': 0,
    'vue/no-unused-components': 0,
    'vue/attribute-hyphenation': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'Index', 'home', 'Home', 'test', 'Test', 'login', 'Login', 'logout', 'Logout']
    }],
    'vue/first-attribute-linebreak': [
      'error', {
        singleline: 'ignore',
        multiline: 'below'
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/prop-name-casing': [
      2,
      'camelCase'
    ],
    'vue/v-slot-style': [
      0,
      {
        atComponent: 'v-slot',
        default: 'shorthand',
        named: 'shorthand'
      }
    ],
    'vue/mustache-interpolation-spacing': [
      2,
      'always'
    ],
    'vue/html-closing-bracket-spacing': [
      2,
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never'
      }
    ],
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-quotes': [
      2,
      'double',
      { avoidEscape: false }
    ],
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false
      }
    ],
    'arrow-parens': [
      2,
      'as-needed'
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral']
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
