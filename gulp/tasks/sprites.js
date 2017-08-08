var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

/* svgSprite defined in an object literal */
var config = {
	mode: {
		css: {
			sprite: 'sprite.svg', 
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

/* beginning the sequence by deleting old temp/sprite folder assure that it won't have any outdated copies  */
/* in 'del'-method: provide an array of folders to delete */
gulp.task('beginClean', function() {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

/* new gulp task; first argument: name_of_the_task, second: what_it_actually_shall_do */
/* beginClean as dependency */
gulp.task('createSprite', ['beginClean'], function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
/* transform */
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
}); 

/* grab any file with the .svg-extension */
gulp.task('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

/* rename file before it reaches its destination */
/* argument in the middle -> dependencies meaning first create sprite and wait till complete, then copy */
gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

/* by the end of 'icons'-sequence we don't longer need temp/sprite-folder at all */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del('./app/temp/sprite');
});

//task running both tasks above
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);