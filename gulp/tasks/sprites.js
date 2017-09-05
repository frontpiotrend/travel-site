/* importing packages */
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

/* svgSprite defined in an object literal */
var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render) {
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
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

/* gulp task creating svg-sprite; first argument: name_of_the_task, second: what_it_actually_shall_do */
/* + beginClean as dependency */
gulp.task('createSprite', ['beginClean'], function() {
	return gulp.src('./app/assets/images/icons/**/*.svg')
/* transform */
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
}); 

gulp.task('createPngCopy', ['createSprite'], function () {
	/* which file to begin/do with; final name will be dynamic, we can't predict it '*.svg' */
	return gulp.src('./app/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./app/temp/sprite/css'));
});

/* grab any file with the .svg-extension */
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);