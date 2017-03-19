'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();
var less = require('gulp-less');
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var run = require('run-sequence');
var del = require('del');

gulp.task('style', function () {
  gulp.src('less/style.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('serve', function () {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});

gulp.task('build', function (Fn) {
  run('clean', 'copy', 'style', Fn);
});

gulp.task('copy', function () {
  return gulp.src([
    'fonts/*.ttf',
    'js/**',
    '*.html',
    '*.json'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});
