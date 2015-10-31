/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {

    // dont pollute our index.html with meta data
    storeConfigInMeta: false,

    fingerprint: {
      exclude: ['apple-touch-icon', 'favicon', 'mstile', 'main.js']
    }
  });

  // Extra scripts to incude
  app.import('bower_components/moment/moment.js');

  // For file uploads with Cloudinary and jQuery
  app.import('bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
  app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
  app.import('bower_components/cloudinary/js/jquery.cloudinary.js');

  return app.toTree();
};
