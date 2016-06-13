var gulp          = require('gulp'),
	nodemon       = require('gulp-nodemon')
	
var stylus = require('gulp-stylus');
	
gulp.task('default', function(){
	nodemon({
		script: 'app.js'
	});
});