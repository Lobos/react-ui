const gulp = require('gulp');
const watch = require('gulp-watch');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const server = require('./testServer');
const config = require('./webpack.config.test');

function testComponents() {
  const options={
    reporter:'spec'
  }

  const stream = mochaPhantomJS(options);

  stream.write({path: 'http://localhost:3001'});
  stream.end();

  return stream;
}

gulp.task('watch', () => {
  watch('src/*.js', () => {
    testComponents();
  });

  return server.start();
});

gulp.task('test', ['watch'], ()=> {
  testComponents();
})
