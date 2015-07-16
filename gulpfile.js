/* global require */
var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;
var critical = require('critical');
var shell = require('gulp-shell');

// Extracts the necessary CSS to render the specified viewport,
// inlines it in the header and loads the rest of the CSS async
gulp.task('critical', function() {
	critical.generateInline({
		base: 'dist/',
		src: 'index.html',
		htmlTarget: 'index.html',
		width: 1300,
		height: 900
	});
});

/**
 * Create a native Linux, OS X and Windows app using electron.

 * IMPORTANT! Before doing this, you have to:

 * - check public/main.js and choose if you want to use radio4000.com
 	  or a local version of the app for building
 * - install `npm i -g electron-packager`
 * - `ember build --environment=electron`
 */

//

gulp.task('electron', ['build-electron'], shell.task([
	'electron-packager dist Radio4000 --out=dist --platform=all --arch=x64 --asar --prune --version=0.29.2 --overwrite --icon=dist/images/logos/radio4000.icns'
]));

gulp.task('build-electron', shell.task([
	'ember build --environment=electron'
]));

// Upload dist to dev
gulp.task('deploy-dev', function() {
	rsync({
		src: 'dist/',
		dest: 'oskarrough@web461.webfaction.com:/home/oskarrough/webapps/radio_dev',
		ssh: true,
		recursive: true,
		// deleteAll: true // Careful, this could cause data loss
	}, function(error, stdout, stderr, cmd) {
		if (error) {
			console.log(error.message);
		} else { // success
			console.log('Successfully deployed to dev.radio4000.com');
			console.log('Note: make sure you deployed using the correct "firebaseURL" in environement.js');
		}
	});
});

// Upload dist to live
gulp.task('deploy-live', function() {
	rsync({
		src: 'dist/',
		dest: 'oskarrough@web461.webfaction.com:/home/oskarrough/webapps/radio',
		ssh: true,
		recursive: true
		// deleteAll: true // Careful, this could cause data loss
	}, function(error, stdout, stderr, cmd) {
		if (error) {
			console.log(error.message);
		} else { // success
			console.log('Successfully deployed to radio4000.com');
			console.log('Note: make sure you deployed using the correct "firebaseURL" in environement.js');
		}
	});
});
