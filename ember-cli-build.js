/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  // var production = (app.env === 'production' || app.env === 'electron');
  var app = new EmberApp(defaults, {

    // dont pollute our index.html with meta data
    storeConfigInMeta: false,

    fingerprint: {
      // enabled: production,

      exclude: ['apple-touch-icon', 'favicon', 'mstile', 'main.js']

      // add our CDN to assets (but not favicons)
      // prepend: 'http://dyzwdli7efbh5.cloudfront.net/'
    }

    // ,
    // minifyCSS: {
    //   enabled: production
    // },
    // minifyJS: {
    //   enabled: production
    // }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Extra scripts to incude
  app.import('bower_components/moment/moment.js');
  // app.import('bower_components/lazysizes/lazysizes.js');

  // For file uploads with Cloudinary and jQuery
  app.import('bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
  app.import('bower_components/cloudinary/js/jquery.cloudinary.js');

  return app.toTree();
};
