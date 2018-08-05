var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config ={
	mode:{
		css:{
			sprite: 'sprite.svg',
			render:{
				css: {
					template:'./app/assets/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean',function(){
	return del(['./app/assets/sprite','./app/assets/images/sprite']);
});

gulp.task('createSprite',['beginClean'],function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('./app/assets/sprite/'));
});

gulp.task('copySpriteCSS',['createSprite'],function(){
	return gulp.src('./app/assets/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/modules'));
});

gulp.task('copySpriteGraphic',['createSprite'],function(){
	return gulp.src('./app/assets/sprite/css/**/*.svg')
	.pipe(gulp.dest('./app/assets/images/sprite'));
});

gulp.task('endClean',['copySpriteCSS','copySpriteGraphic'],function(){
	return del(['./app/assets/sprite']);
});

gulp.task('icons',['beginClean','createSprite','copySpriteCSS','copySpriteGraphic','endClean']);
