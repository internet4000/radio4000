/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'radio4000',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    firebase: 'https://radio4000-dev.firebaseio.com/',
    youtubeApiKey: 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4',
    torii: {
      // a 'session' property will be injected on routes and controllers
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
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
      timeout: 5000,
      extendedTimeout: 200
      // injectionFactories: [],
      // sticky: true
    }
  };

  ENV.contentSecurityPolicy = {
    'connect-src': "'self' wss://*.firebaseio.com",
    'frame-src': "'self' https://www.youtube.com https://*.firebaseio.com",
    'script-src': "'self' 'unsafe-eval' https://www.youtube.com/iframe_api https://s.ytimg.com https://*.firebaseio.com"
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
    ENV.firebase = 'https://radio4000.firebaseio.com/';
    ENV.googleAnalytics = {
        webPropertyId: 'UA-3906535-23'
    };
  }

  if (environment === 'electron') {
    ENV.baseURL = './';
    ENV.locationType = 'hash';
    ENV.firebase = 'https://radio4000.firebaseio.com/';
  }

  return ENV;
};
