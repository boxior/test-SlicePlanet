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

// Скрипты проекта

// gulp.task('html', function() {
// 	return gulp.src('app/templates/index.html')
// 	.pipe(rigger())
// 	.pipe(gulp.dest('app'))
// 	.pipe(browserSync.reload({stream : true}))
// });

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });

// gulp.task('js', ['common-js'], function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/libs/tether/js/tether.min.js',
// 		'app/libs/bootstrap/js/bootstrap.min.js',
// 		'app/js/common.min.js', // Всегда в конце
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Минимизировать весь js (на выбор)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({stream: true}));
// });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'scss_template/'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
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

// gulp.task('sass', function() {
//     setTimeout(function() {
//         return gulp.src('assets/scss/**/*.scss')
//             .pipe(sass())
//             .pipe(autoprefixer(['last 5 versions', '> 1%'], { cascade: true }))
//             .pipe(postcss([mqpacker()]))
//             .pipe(gulp.dest('assets/css'))
//             .pipe(browserSync.reload({ stream: true }));
//     }, 100);
// });

// gulp.task('sass', function() {
// 	return gulp.src('app/sass/**/*.sass')
// 	// return gulp.src('app/sass/main.sass')
// 	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
// 	.pipe(rename({suffix: '.min', prefix : ''}))
// 	.pipe(autoprefixer(['last 15 versions']))
// 	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
// });

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('scss_template/scss/**/*.scss', ['sass']);
	// gulp.watch('app/templates/**/*.html', ['html']);
	// gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('scss_template/*.html', browserSync.reload);
});

// gulp.task('imagemin', function() {
// 	return gulp.src('app/img/**/*')
// 	.pipe(cache(imagemin()))
// 	.pipe(gulp.dest('dist/img')); 
// });

// gulp.task('build', ['removedist', 'imagemin', 'sass', 'js', 'html'], function() {

// 	var buildFiles = gulp.src([
// 		'app/*.html',
// 		'app/.htaccess',
// 		]).pipe(gulp.dest('dist'));

// 	var buildCss = gulp.src([
// 		'app/css/main.min.css',
// 		]).pipe(gulp.dest('dist/css'));

// 	var buildJs = gulp.src([
// 		'app/js/scripts.min.js',
// 		]).pipe(gulp.dest('dist/js'));

// 	var buildFonts = gulp.src([
// 		'app/fonts/**/*',
// 		]).pipe(gulp.dest('dist/fonts'));

// });

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));

// });

// gulp.task('removedist', function() { return del.sync('dist'); });
// gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
