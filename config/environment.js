/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'radio4000',
    environment: environment,
    firebase: {
      apiKey: 'AIzaSyDi6cxC167OWaliNMnZkE0BX1XP8ObwdnQ',
      authDomain: 'radio4000-staging.firebaseapp.com',
      databaseURL: 'https://radio4000-staging.firebaseio.com',
      // apiKey: 'AIzaSyAyeuzsaD353IhPbffzvP8EE88HNTwSTY0',
      // authDomain: 'radio4000.firebaseapp.com',
      // databaseURL: 'https://radio4000.firebaseio.com',
      storageBucket: ''
    },
    youtubeApiKey: 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    flashMessageDefaults: {
      timeout: 3000,
      extendedTimeout: 1000
    }
  };

  ENV.CLOUDINARY_NAME = 'radio4000';
  ENV.CLOUDINARY_UPLOAD_PRESET = 'tc44ivjo';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
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
      databaseURL: 'https://radio4000.firebaseio.com',
      storageBucket: ''
    };
    // Enable google analytics
    ENV.googleAnalytics = {
        webPropertyId: 'UA-3906535-23'
    };
  }

  return ENV;
};
