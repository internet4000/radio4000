/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'radio4000',
    environment: environment,
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

		// https://console.developers.google.com/apis/credentials/key/2?project=firebase-radio4000
		youtubeApiKey: 'AIzaSyBPY0xzz4PQEl5hgm-wggEA4Zlho11Rtfk',

		// Radio4000 staging project.
		firebase: {
			apiKey: 'AIzaSyDi6cxC167OWaliNMnZkE0BX1XP8ObwdnQ',
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
		}
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
		// Switch to live Firebase
		ENV.firebase = {
			apiKey: 'AIzaSyAyeuzsaD353IhPbffzvP8EE88HNTwSTY0',
			authDomain: 'radio4000.firebaseapp.com',
			databaseURL: 'https://radio4000.firebaseio.com'
		};

		// Enable google analytics
		ENV.googleAnalytics = {
			webPropertyId: 'UA-3906535-23'
		};
  }

  return ENV;
};
