const gulp = require('gulp'),
  gutil = require('gulp-util'),
  rimraf = require('gulp-rimraf'),
  istanbul = require('gulp-babel-istanbul'),
  watch = require('gulp-watch'),
  mochaPhantomJS = require('gulp-mocha-phantomjs'),

  webpack = require('webpack-stream'),
  config = require('./webpack.config.test'),

  opts = {
    includeUntested: true,
    'hook-run-in-context': true,
    reporters: ['text-summary', 'html'],
    reportOpts: {dir: './coverage'}
  },

  paths = {
    clean: ['./coverage', './test/static'],
    src: ['./src/**/*.js'],
    entry: 'test/static/testBundle.js',
    tests: 'test/index.html'
  };

//unit test coverage
gulp.task('clean', ()=> {
  console.log('\nDeleting: ' + paths.clean);

  return gulp.src(paths.clean, {read: false})
    .pipe(rimraf())
    .on('error', gutil.log);
});

gulp.task('build', ['clean'], ()=> {
  //disable watch mode
  config.watch=false;

  return gulp.src('./').pipe(webpack(config)).pipe(gulp.dest('test'))
});

gulp.task('coverage',['build'], ()=> {
  return gulp.src(paths.src).pipe(istanbul(opts))
    .on('finish', ()=> {
      gulp.src(paths.tests)
        .pipe(mochaPhantomJS({reporter: 'spec'}))
        .pipe(istanbul.writeReports(opts));
    })
    .on('error', gutil.log);
})

//unit test
gulp.task('test', ()=> {
  watch(paths.entry, () => {
    gulp
      .src(paths.tests)
      .pipe(mochaPhantomJS({reporter: 'spec'}));
  });

  gulp.src('./').pipe(webpack(config)).pipe(gulp.dest('test'));
});
