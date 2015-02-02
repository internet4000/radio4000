/*global require */
var gulp = require('gulp');
var rsync = require('rsyncwrapper').rsync;

/**
 * Upload dist to dev
 */
gulp.task('deploy-dev', function() {
	rsync({
		src: 'dist/',
		dest: 'oskarrough@web461.webfaction.com:/home/oskarrough/webapps/radio_dev',
		ssh: true,
		recursive: true,
		// deleteAll: true // Careful, this could cause data loss
	}, function(error,stdout,stderr,cmd) {
		if (error) {
			console.log(error.message);
		} else { // success
			console.log('Successfully deployed to dev.radio4000.com');
			console.log('Note: make sure you deployed using the correct "firebaseURL" in environement.js');
		}
	});
});

/**
 * Upload dist to live
 */
gulp.task('deploy-live', function() {
	rsync({
		src: 'dist/',
		dest: 'oskarrough@web461.webfaction.com:/home/oskarrough/webapps/radio',
		ssh: true,
		recursive: true,
		// deleteAll: true // Careful, this could cause data loss
	}, function(error,stdout,stderr,cmd) {
		if (error) {
			console.log(error.message);
		} else { // success
			console.log('Successfully deployed to radio4000.com');
			console.log('Note: make sure you deployed using the correct "firebaseURL" in environement.js');
		}
	});
});
