var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png =require('gulp-svg2png');

var config ={
	mode:{
		css:{
			variables: {
				replaceSvgWithPng: function(){
					return function(sprite,render){
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
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

gulp.task('createSvg2Png',['createSprite'],function(){
	return gulp.src('./app/assets/sprite/css/*.svg')
	.pipe(svg2png())
	.pipe(gulp.dest('./app/assets/sprite/css'));
});

gulp.task('copySpriteCSS',['createSprite'],function(){
	return gulp.src('./app/assets/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/modules'));
});

gulp.task('copySpriteGraphic',['createSvg2Png'],function(){
	return gulp.src('./app/assets/sprite/css/**/*.{svg,png}')
	.pipe(gulp.dest('./app/assets/images/sprite'));
});

gulp.task('endClean',['copySpriteCSS','copySpriteGraphic'],function(){
	return del(['./app/assets/sprite']);
});

gulp.task('icons',['beginClean','createSprite','createSvg2Png','copySpriteCSS','copySpriteGraphic','endClean']);
