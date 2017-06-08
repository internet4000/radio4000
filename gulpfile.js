/* global require */
var gulp = require('gulp')
var glob = require('glob')
var gulpicon = require('gulpicon/tasks/gulpicon')

/**
 * GULP ICONS
 * Takes a folder of svgs and returns a .css svg spritesheet as well as png fallbacks
 */

var svgs = glob.sync('public/assets/images/icons/*.svg')
gulp.task('icons', gulpicon(svgs, {
	dest: 'public/assets/images/icons/grunticon'
}))
