var src = ['./src/**/*.js', './src/**/*.jsx']

module.exports = {
  options: {
    jshintrc: '.jshintrc'
  },
  build: {
    src: ['./gruntfile.js', './grunt/**/*.js']
  },
  src: {
    src: src
  }
}
