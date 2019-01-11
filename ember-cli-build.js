'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function (defaults) {
	let app = new EmberApp(defaults, {
		// Don't pollute our index.html with meta data.
		storeConfigInMeta: false,

		// Disable testing with localhost:4000/tests. Instead use `npm test`.
		// tests: EmberApp.env() === 'test',

		// http://ember-service-worker.com/documentation/configuration/
		'ember-service-worker': {
			// enabled: EmberApp.env() === 'production',
			registrationStategy: 'async',
			versionStrategy: 'every-build'
		},
		'asset-cache': {
			include: ['assets/**/*', '**/*.html', 'index.html', '*.webmanifest']
		},
		'esw-index': {
			excludeScope: [
				/\/favicon.png?$/
			]
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
