/* global require */
var gulp = require('gulp');
var critical = require('critical').stream;

// Extracts the necessary CSS to render the specified viewport,
// inlines it in the header and loads the rest of the CSS async
gulp.task('critical', function () {
	return gulp.src('dist/index.html')
		.pipe(critical({base: 'dist/', inline: true}))
		.pipe(gulp.dest('dist'));
});

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
