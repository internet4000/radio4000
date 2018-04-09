module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module'
	},
	plugins: [
		'ember'
	],
	extends: [
		'eslint:recommended',
		'xo',
		'plugin:ember/recommended',
	],
	env: {
		browser: true
	},
	// Change errors to warnings to avoid the CI builds failing.
	rules: {
		'capitalized-comments': 'off',
		'indent': 'warn',
		'no-alert': 'off',
		'object-curly-spacing': 'off',
		'semi': 'off',
		'space-before-function-paren': 'off',
		'ember/closure-actions': 'warn',
		'ember/new-module-imports': 'off',
		'ember/no-on-calls-in-components': 'warn'
	},
	overrides: [
		// node files
		{
			files: [
				'testem.js',
				'ember-cli-build.js',
				'config/**/*.js',
				'lib/*/index.js'
			],
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015
			},
			env: {
				browser: false,
				node: true
			}
		},

		// test files
		{
			files: ['tests/**/*.js'],
			excludedFiles: ['tests/dummy/**/*.js'],
			env: {
				embertest: true
			}
		}
	]
};
