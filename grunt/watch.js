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

  js: {
    files: [jsList],
    tasks: ['jshint', 'browserify']
  },

  less: {
    files: [lessList],
    tasks: ['less:admin']
  }

}
