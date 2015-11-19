var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css');
    jade = require('gulp-jade')
    sass = require('gulp-sass')

handleErrors = function(){
  var args = Array.slice.call(arguments)
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args )
  // @emit "end"
}

gulp.task('default', ['jade', 'sass'], function(){
  gulp.watch('./src/sass/*.sass', ['sass']);
  gulp.watch('./src/*.jade', ['jade']);
});


gulp.task('sass', function () {
  gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', handleErrors))
    .pipe(gulp.dest('build/css'));
});

gulp.task('jade', function() {
  return gulp.src('./src/*.jade')
    .pipe( jade().on('error', handleErrors) )
    .pipe(gulp.dest('build/'));
});

gulp.task('inliner', function() {
  return gulp.src('build/*.html')
    .pipe(inlineCss().on('error', handleErrors))
    .pipe(gulp.dest('build/inlined/'));
});
