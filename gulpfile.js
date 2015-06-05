/* global require */
var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;
var atomshell = require('gulp-atom-shell');
var critical = require('critical');

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

// Package into an OSX64 bit application using atom-shell
gulp.task('atom', function () {
	return gulp.src('dist/**')
		.pipe(atomshell({
			version: '0.22.1',
			productName: 'Radio4000',
			productVersion: '2.0.1',
			platform: 'darwin',
			darwinIcon: 'dist/images/logos/radio4000.icns',
			name: 'Radio4000'
		}))
		.pipe(atomshell.zfsdest('build/radio4000-osx.zip'));
});

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
