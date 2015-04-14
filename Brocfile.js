/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({

	// dont pollute our index.html with meta data
	storeConfigInMeta: false

	// fingerprint: {
	// 	// enable for these environments
	// 	enabled: this.env === 'production' || this.env === 'native',
	// 	prepend: 'http://dyzwdli7efbh5.cloudfront.net/'
	// },

	// minify our styles using broccoli-csso
	// minifyCSS: {
	// 	enabled: (this.env === 'production' || this.env === 'native')
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

// For file uploads with Cloudinary and jQuery
app.import('bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
app.import('bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
app.import('bower_components/blueimp-file-upload/js/jquery.fileupload.js');
app.import('bower_components/cloudinary/js/jquery.cloudinary.js');

module.exports = app.toTree();
