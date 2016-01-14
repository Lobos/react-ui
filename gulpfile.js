const gulp = require('gulp');
//const webpack = require('webpack-stream');
const server = require('./devServer');
const watch = require('gulp-watch');
//const mochaPhantomJS = require('gulp-mocha-phantomjs');
const config = require('./webpack.config.test');

function test() {
  return gulp
    .src('test/components/index.html')
    .pipe(mochaPhantomJS({reporter: 'spec'}));
}

gulp.task('test', () => {
  //gulp.src('./').pipe(webpack(config)).pipe(gulp.dest('test/static'));

  //watch('devServer.js', () => {
  //    server.close();
  //    server.start();
  //    test();
  //});
  server.start();

  watch('src/*', () => {
    test();
  });
});
