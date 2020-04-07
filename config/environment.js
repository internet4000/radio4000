'use strict';

module.exports = function(environment) {
	let ENV = {
		modulePrefix: 'radio4000',
		environment,
		rootURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		},

		/* https://console.developers.google.com/apis/credentials?project=firebase-radio4000 */
		youtubeApiKey: 'AIzaSyCfWaTUSMUgxCTybvT9eBvFvQ9toQwk5Mo',

		// Radio4000 staging project.
		firebase: {
			apiKey: 'AIzaSyAOWDGWR6dgJXNvG_B9A6hIaJNVQBwg0jI',
			authDomain: 'radio4000-staging.firebaseapp.com',
			databaseURL: 'https://radio4000-staging.firebaseio.com'
		},

		stripe: {
			key: 'pk_test_Ti8aYhMv1as1ZrbaZzaI8QOk'
		},

		torii: {
			sessionServiceName: 'session'
		},

		flashMessageDefaults: {
			timeout: 3000,
			extendedTimeout: 1000
		},

		pageTitle: {
			separator: ' - '
		}
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;

		/*
			 just so it allows localhost, *staging environment*
			 https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=radio4000-staging
		 */
		ENV.youtubeApiKey = 'AIzaSyAbjtPHB4lT9llC07q7YiLYB6HvPx4Cvu8'
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
		ENV.APP.autoboot = false;
	}

	if (environment === 'production') {
		// here you can enable a production-specific feature
		// Switch to live Firebase
		ENV.firebase = {
			apiKey: 'AIzaSyDu8ksQyO7t1hEAPjejIoA_xbMN7iiMakE',
			authDomain: 'radio4000.firebaseapp.com',
			databaseURL: 'https://radio4000.firebaseio.com'
		}
	}

	return ENV;
};
