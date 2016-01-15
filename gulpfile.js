const gulp = require('gulp');
const watch = require('gulp-watch');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const webpack = require('webpack-stream');
const config = require('./webpack.config.test');

gulp.task('test', ()=> {
  gulp.src('./').pipe(webpack(config)).pipe(gulp.dest('test'));

  watch('test/static/testBundle.js', () => {
    gulp
      .src('test/index.html')
      .pipe(mochaPhantomJS({reporter: 'spec'}));
  });
})
