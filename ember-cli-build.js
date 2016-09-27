/* jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		// Don't pollute our index.html with meta data.
		storeConfigInMeta: false,

		// Don't fingerprint favicons as browsers expect standard names.
		fingerprint: {
			exclude: ['apple-touch-icon', 'favicon', 'mstile', 'icns']
		},

		// Very verbose but this adds autoprefixer and atImport (option to import css/scss from node modules).
		styleProcessorOptions: {
			processors: [
				{
					type: 'node-sass'
				},
				{
					type: 'postcss',
					plugins: [
						{
							module: atImport
						},
						{
							module: autoprefixer,
							options: {
								browsers: ['last 2 versions']
							}
						}
					]
				}
			],
			extension: 'scss'
		}
	});

	return app.toTree();
};
