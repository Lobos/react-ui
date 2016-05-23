var gulp = require('gulp')
var webdriver = require('gulp-webdriver')

var src = ['src/**/*.js', 'test/e2e/**/*.js']

gulp.task('webdriver:conf', function () {
  return gulp.src('wdio.conf.js').pipe(webdriver({
    logLevel: 'verbose',
    waitforTimeout: 10000,
    reporter: 'spec'
  }))
})

gulp.task('test:e2e', function () {
  gulp.start('webdriver:conf')
  gulp.watch(src, ['webdriver:conf'])
})
