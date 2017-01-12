module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	extends: 'xo',
	env: {
		'browser': true
	},
	rules: {
		// these are normally errors but warnings,
		// are enough. Otherwise CI breaks.
		'no-mixed-spaces-and-tabs': 'warn',
		'array-callback-return': 'warn',
		'no-path-concat': 'warn',
		'camelcase': ['warn', {
			properties: 'always'
		}],
		'indent': ['warn', 'tab', {
			SwitchCase: 1
		}]
	}
};
