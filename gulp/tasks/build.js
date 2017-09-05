var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin')
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

//code from browserSync in watch.js
gulp.task('previewDist', function() {
	browserSync.init({
   	notify: false,
		server: {
   	baseDir: "docs"
    	}
  	});
});

//begin the build-task by deleting the 'docs'-folder so after renaming or deleting files in app-folder changes reflects also in docs-folder
gulp.task('deleteDistFolder', ['icons'], function() {
	return del("./docs")
});

//reusable for other projects: other files for example like cms wordpress copied as well
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	//list of our paths in variable
	var pathsToCopy = [
		'./app/**/*', 
		'!./app/index.html',
		'!./app/assets/images/**',
		'!.app/assets/styles/**',
		'!.app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	
	return gulp.src(pathsToCopy) 
	.pipe(gulp.dest("./docs"));
});

//task to copy all images files to 'dist'-folder and compress them before they reach their destination
/*in gulp.src providing more than one path -> list them in array of paths -> []; '!' to exclude some files -> icons folder; ** -> going to any subfolder of necesary; * and any files */
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*']) 
	.pipe(imagemin({
		progressive: true,
		interlaced: true,
		multipass: true
	}))
	.pipe(gulp.dest("./docs/assets/images"));
});


//task to trigger/begin 'usemin'-task
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});

/*usemin is a tool to copy, compress and revision css- and js- files 
gulp-rev to revision files; gulp-cssnano to compress css; gulp-uglify to compress js
*/
/* usemin begins not until fresh rebuild of styles and scripts + by 'deleteDistFolder' fresh icon-sprites  */
gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
	.pipe(usemin({
		css: [function() {return rev()}, function() {return cssnano()}],
		js: [function() {return rev()}, function() {return uglify()}]
	}))
	.pipe(gulp.dest("./docs"));
});


//shortcut run in the command line that will triger and call other multiple tasks
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);


//previewing 'dist' copy in the web browser
