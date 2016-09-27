/* global require */
var gulp = require('gulp');
var critical = require('critical').stream;
var glob = require('glob');
var gulpicon = require('gulpicon/tasks/gulpicon');

/**
 * GULP CRITICAL
 * Extracts the necessary CSS to render the specified viewport and inlines it in the header and loads the rest of the CSS async
 */
gulp.task('critical', function () {
	return gulp.src('dist/index.html')
		.pipe(critical({base: 'dist/', inline: true}))
		.pipe(gulp.dest('dist'));
});

/**
 * GULP ICONS
 * Takes a folder of svgs and returns a .css svg spritesheet as well as png fallbacks
 */

var svgs = glob.sync('public/assets/images/icons/*.svg');
gulp.task('icons', gulpicon(svgs, {
	dest: 'public/assets/images/icons/grunticon'
}));
