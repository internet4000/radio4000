/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const targets = require('./config/targets');

module.exports = function(defaults) {
	let app = new EmberApp(defaults, {
		// Don't pollute our index.html with meta data.
		storeConfigInMeta: false,

		// Don't fingerprint favicons.
		fingerprint: {
			exclude: [
				'apple-touch-icon', 'android-chrome',
				'favicon', 'mstile', 'icns'
			]
		},

		// Enable autoprefixer and imports from node modules.
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
								browsers: targets.browsers
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

