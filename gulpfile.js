const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create() ;
plugins.sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./resources/project.scss')
        .pipe(plugins.sourcemaps.init())    
        .pipe(plugins.sassGlob())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.csso())
        .pipe(plugins.autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('public/stylesheet/'))
        .pipe(browserSync.stream())
});

gulp.task('javascript', () => {
    return gulp.src('./resources/project.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['@babel/env']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('public/javascript'))
        .pipe(browserSync.stream())
});

const jquery = './resources/library/jquery/jquery-3.3.1.min.js';

gulp.task('libraryJS', () => {
    return gulp.src([jquery, './resources/library/**/*.js'])
        .pipe(plugins.concat('library.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('public/javascript'))
        .pipe(browserSync.stream())
});

gulp.task('svg', () => {
	return gulp.src('resources/svg/*.svg')
		.pipe(plugins.svgmin({ js2svg: { indent: 2, pretty: false } }))
        .pipe(plugins.svgSprite({
            mode: {
                symbol: {
                    sprite: "../project.svg"                    
                }
            }
        }))
        .pipe(gulp.dest('public/svg'))
});

gulp.task('watch', () => {
    gulp.watch(['./resources/**/*.scss'], gulp.series('sass'));
    gulp.watch(['./resources/*.js'], gulp.series('javascript'));
    gulp.watch(['./resources/library/**/*.js'], gulp.series('libraryJS'));
    gulp.watch(['./resources/svg/*.svg'], gulp.series('svg'));

});

gulp.task('default', gulp.series(
    gulp.parallel('sass', 'javascript', 'libraryJS', 'svg'),
    gulp.parallel('watch')
));