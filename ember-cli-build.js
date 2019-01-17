'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

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

		// http://ember-service-worker.com/documentation/configuration/
		'ember-service-worker': {
			enabled: EmberApp.env() === 'production',
			versionStrategy: 'every-build'
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
		}
	})

	return app.toTree()
}
