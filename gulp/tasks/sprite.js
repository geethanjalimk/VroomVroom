var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename');

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

gulp.task('createSprite',function(){
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

gulp.task('icons',['createSprite','copySpriteCSS','copySpriteGraphic']);
