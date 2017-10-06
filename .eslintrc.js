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
	// Change errors to warnings to avoid the CI builds failing.
	rules: {
		'capitalized-comments': 'off',
		'indent': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'object-curly-spacing': 'off',
		'semi': 'off',
		'space-before-function-paren': 'off'
	}
};
