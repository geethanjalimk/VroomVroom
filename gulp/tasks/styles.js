var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
varscss = require('postcss-simple-vars'),
importcss = require('postcss-import'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins');

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles.css')
		.pipe(postcss([importcss, mixins, varscss, nested, autoprefixer]))
		.on('error', function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/assets/styles'));
});