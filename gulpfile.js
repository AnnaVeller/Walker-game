var gulp = require('gulp')
var ghPages = require('gulp-gh-pages')

gulp.task('deploy', function () {
  return gulp.src('./build/web-desktop/**/*')
    .pipe(ghPages())
})
