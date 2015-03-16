module.exports = {
  options: {
    transform:  [ require('grunt-react').browserify ],
    browserifyOptions: {
      debug: false,
      standalone: 'App'
    }
  },
  admin: {
    src: './src/js/index.js',
    dest: './dist/js/react-ui.js'
  }
}
