var gulp = require('gulp');
var server = require('browser-sync').create();
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('less', function () {
  gulp.src('less/style.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});

gulp.task('serve', function() {
  server.init({
    server: '.',
  });

  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
