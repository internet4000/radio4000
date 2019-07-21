module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
		// 'no-console': 'warn',
		// 'capitalized-comments': 'off',
		// 'ember/closure-actions': 'warn',
		// 'ember/new-module-imports': 'off',
		// 'ember/no-on-calls-in-components': 'warn',
		// 'ember/use-brace-expansion': 'warn',
		// 'no-alert': 'off',
		// 'object-curly-spacing': 'off',
		// 'space-before-function-paren': 'off',
		// // Disable a few "best practices" for now
		// curly: ['error', 'multi-line'],
		// indent: 'warn',
		// semi: 'off'
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
