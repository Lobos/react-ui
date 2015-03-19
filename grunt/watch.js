var jsList = ['./src/**/*.js', './src/**/*.jsx']
var lessList = ['./src/less/**/*.less']

module.exports = {
  options: {
    livereload: true
  },
  buildJs: {
    files: ['./gruntfile.js', './grunt/**/*.js'],
    tasks: ['jshint:build']
  },

  docsJs: {
    files: [jsList, './docs/js/**/*.js', './docs/js/**/*.jsx'],
    tasks: ['jshint:docs', 'browserify:docs']
  },

  docsLess: {
    files: [lessList, './docs/less/**/*.less'],
    tasks: ['less:docs']
  },

  docsHtml: {
    files: ['./docs/**/*.html', './docs/**/*.json'],
    tasks: ['copy:docsHtml']
  }
}
