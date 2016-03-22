/* jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Don't pollute our index.html with meta data.
    storeConfigInMeta: false,

    // Don't fingerprint favicons as browsers expect standard names.
    fingerprint: {
      exclude: ['apple-touch-icon', 'favicon', 'mstile', 'icns']
    },

    // Very verbose but this adds autoprefixer and atImport.
    styleProcessorOptions: {
      processors: [
        {
          type: 'sass'
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
                browsers: ['last 2 versions']
              }
            }
          ]
        }
      ],
      extension: 'scss'
    }
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

  return app.toTree();
};
