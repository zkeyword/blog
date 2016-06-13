var gulp          = require('gulp'),
	nodemon       = require('gulp-nodemon')
	
var stylus = require('gulp-stylus');
	
gulp.task('default', function(){
	nodemon({
		script: 'app.js'
	});
});

gulp.task('watch', function(){
	gulp.watch('./static/**', ['stylus']);
});

gulp.task('stylus', function () {
  gulp.src('./static/style.styl')
    .pipe(
		stylus({
			url: { name: 'url', limit: false }
		})
	)
    .pipe(gulp.dest('./static/css/'));
});