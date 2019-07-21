module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module'
	},
	plugins: ['ember'],
	extends: ['eslint:recommended', 'plugin:ember/recommended', 'xo'],
	env: {
		browser: true
	},
	// Change errors to warnings to avoid the CI builds failing.
	rules: {
		'no-console': 'warn',
		'capitalized-comments': 'off',
		'ember/closure-actions': 'warn',
		'ember/new-module-imports': 'off',
		'ember/no-on-calls-in-components': 'warn',
		'ember/use-brace-expansion': 'warn',
		'no-alert': 'off',
		'object-curly-spacing': 'off',
		'space-before-function-paren': 'off',
		// Disable a few "best practices" for now
		curly: ['error', 'multi-line'],
		indent: 'warn',
		semi: 'off'
	},
	overrides: [
		// node files
		{
			files: [
				'ember-cli-build.js',
				'testem.js',
				'blueprints/*/index.js',
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
		}
	]
}
