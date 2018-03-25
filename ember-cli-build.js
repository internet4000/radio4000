'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const autoprefixer = require('autoprefixer')
const atImport = require('postcss-import')
const targets = require('./config/targets')

module.exports = function (defaults) {
	let app = new EmberApp(defaults, {
		// Don't pollute our index.html with meta data.
		storeConfigInMeta: false,

		// Disable testing with localhost:4000/tests. Instead use `npm test`.
		// tests: EmberApp.env() === 'test',

		// Use <script async>
		emberCliConcat: {
			js: {
				concat: true,
				useAsync: true
			},
			css: {
				concat: true
			}
		},

		fingerprint: {
			exclude: [
				// favicons
				'apple-touch-icon',
				'android-chrome',
				'favicon',
				'mstile',
				// ember-leaflet
				'icns',
				'images/layers-2x.png',
				'images/layers.png',
				'images/marker-icon-2x.png',
				'images/marker-icon.png',
				'images/marker-shadow.png'
			]
		},

		// Enable autoprefixer and imports from node modules.
		styleProcessorOptions: {
			processors: [
				{
					type: 'node-sass',
					sourcemaps: true
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
	})

	return app.toTree()
}
