var gulp = require('gulp'),
usemin = require('gulp-usemin'),
imagemin = require('gulp-imagemin');
del = require('del'),
cssnano = require('gulp-cssnano'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDest',function(){
	browserSync.init({
		notify: false,
		server: {baseDir: 'docs'}
	});
});

gulp.task('deleteDestFolder',['icons'],function(){
	return del("./docs");
});

gulp.task('copyGeneralFiles',['deleteDestFolder'],function(){
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deleteDestFolder'],function(){
	return gulp.src(['./app/assets/images/**/*','!./app/assets/images/icons','!./app/assets/images/icons/**/*'])
	.pipe(imagemin({
		progressive:true,
		interlaced:true,
		multipass:true
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger',['deleteDestFolder'],function(){
	gulp.start("usemin");
});

gulp.task('usemin',['styles','scripts'],function(){
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css:[function(){return rev()},function(){return cssnano()}],
		js:[function(){return rev()},function(){return uglify()}]
	}))
	.pipe(gulp.dest("./docs"));
});

gulp.task('build',['deleteDestFolder','copyGeneralFiles','optimizeImages','useminTrigger']);
