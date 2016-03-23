var gulp = require("gulp"),
    cssmin = require("gulp-minify-css"),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename');
    concat = require('gulp-concat'),
    // notify = require('gulp-notify');
    // cache = require('gulp-cache'),
gulp.task("testcssmin",function(){
	gulp.src("css/*.css")
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest("css/"));
		// .pipe(notify({ message: 'Styles task complete' }));
});

 // js
gulp.task('jsmin', function () {
    gulp.src(['js/apiv2.0.min.js','js/DrawingManager_min.js','js/DistanceTool_min.js']) //多个文件以数组形式传入
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Images
gulp.task("imageminify",function(){
	gulp.src('tiles/0.png')
    	.pipe(imagemin({
    		optimizationLevel: 2,
    		progressive: true,
    		interlaced: true,
    		multipass: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant({quality: '65-80'})]
    	}))
    	.pipe(gulp.dest('img/'))
    	// .pipe(notify({ message: 'Images task complete' }));
});
// Watch
// gulp.task('watch', function() {
//   // Watch .js files
//   gulp.watch('src/scripts/**/*.js', ['scripts']);
//   // Watch image files
//   gulp.watch('src/images/**/*', ['images']);
// });

// Default task
gulp.task('default', function() {
    gulp.start('testcssmin', 'jsmin', 'imageminify');
});