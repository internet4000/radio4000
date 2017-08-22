module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module'
	},
	extends: 'xo',
	env: {
		browser: true
	},
	rules: {
		'semi': 'off',
		// Change errors to warnings to avoid
		// the CI builds failing.
		'no-unused-vars': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'array-callback-return': 'warn',
		'space-before-function-paren': 'warn',
		'object-curly-spacing': 'warn',
		'no-path-concat': 'warn',
		'camelcase': ['warn', {
			properties: 'always'
		}],
		'indent': ['warn', 'tab', {
			SwitchCase: 1
		}]
	}
};
