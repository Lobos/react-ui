var src = ['./src/**/*.js', './src/**/*.jsx']

module.exports = {
  options: {
    jshintrc: '.jshintrc'
  },
  build: {
    src: ['./gruntfile.js', './grunt/**/*.js']
  },
  default: {
    src: src
  },
  docs: {
    src: [src, './docs/**/*.js', './docs/**/*.jsx', '!./docs/js/prettify.js']
  }
}
