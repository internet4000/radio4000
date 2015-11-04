/* global require */
var gulp = require('gulp');
var critical = require('critical').stream;
var shell = require('gulp-shell');

// Extracts the necessary CSS to render the specified viewport,
// inlines it in the header and loads the rest of the CSS async
gulp.task('critical', function () {
	return gulp.src('dist/index.html')
		.pipe(critical({base: 'dist/', inline: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('deploy:dev', ['critical'], shell.task([
	'mv dist/index.html dist/200.html',
	'surge dist much.radio4000.com'
]));

gulp.task('deploy', ['critical'], shell.task([
	'mv dist/index.html dist/200.html',
	'surge dist https://radio4000.com'
]));

/**
 * Create a native Linux, OS X and Windows app using electron.

	IMPORTANT! Before doing this, you have to:

	- check public/main.js and choose if you want to use radio4000.com
	or a local version of the app for building
	- install `npm i -g electron-packager`
	- `ember build --environment=electron`
 */

gulp.task('electron', ['build-electron'], shell.task([
	'electron-packager dist Radio4000 --out=dist --platform=all --arch=x64 --asar --prune --version=0.29.2 --overwrite --icon=dist/images/logos/radio4000.icns'
]));

gulp.task('build-electron', shell.task([
	'ember build --environment=electron'
]));

// Icons with grunticon (https://gist.github.com/dcalhoun/e79ad10d518612d70721)
const Grunticon = require('grunticon-lib');
const q = require('q');
const path = require('path');
const fs = require('fs');

gulp.task('icons', function () {
	const deferred = q.defer();
	const inputDir = 'public/assets/images/icons/';
	const outputDir = 'public/assets/images/icons/grunticon';
	const options = {enhanceSVG: true};
	const files = fs.readdirSync(inputDir).map(function (fileName) {
		return path.join(inputDir, fileName);
	});
	const grunticon = new Grunticon(files, outputDir, options);

	grunticon.process(function () {
		deferred.resolve();
	});

	return deferred.promise;
});
