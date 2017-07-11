var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rigger         = require("gulp-rigger");



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'scss_template/'
		},
		notify: false,
		
	});
});

gulp.task('sass', () => {
		return gulp.src('scss_template/scss/**/*.scss')
		// return gulp.src('app/sass/main.sass')
		.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
		// .pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(postcss([mqpacker()]))
		// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('scss_template/css'))
		.pipe(browserSync.reload({stream: true}));
})



gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('scss_template/scss/**/*.scss', ['sass']);
	// gulp.watch('app/templates/**/*.html', ['html']);
	// gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('scss_template/*.html', browserSync.reload);
});


gulp.task('default', ['watch']);
