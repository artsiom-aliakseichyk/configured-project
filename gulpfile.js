var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var watch = require('gulp-watch');
var babel = require('gulp-babel');

var server = require('gulp-develop-server');

var concat = require('gulp-concat');


gulp.task('less', function() {
	return gulp.src('./public/styles/dev/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('./public/styles'))
});

gulp.task('babel', function() {
	return gulp.src("./public/scripts/dev/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("./public/scripts/prod"));
});

gulp.task('server:start', function() {
	server.listen({ path: './server.js'});
});

gulp.task('watch', function() {
	gulp.watch('./public/styles/dev/*.less', ['less']);
	gulp.watch('./public/scripts/dev/**/*.js', ['babel']);
	gulp.watch(['./server.js', './routes/*.js'], server.restart);
});

gulp.task('default', ['less', 'babel', 'server:start', 'watch']);