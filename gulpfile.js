var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    livereload = require('gulp-livereload'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('compass', function() {
  gulp.src('sass/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Compass task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['js/vendor/jquery/jquery-2.1.1.min.js', 
                   'js/vendor/modernizr/modernizr.custom.min.js',
                   'js/vendor/skrollr/skrollr.min.js',
                   'js/custom.js',
                   'js/init/init.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/uncompressed/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images/'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', ['clean'], function() {
    gulp.start('compass', 'scripts', 'images');
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/assets/img'], cb)
});

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['compass']);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('assets/images/uncompressed/*', ['images']);
    
    // livereload init and listener
    livereload.listen();
    gulp.watch('dist/**').on('change', livereload.changed);
    
});