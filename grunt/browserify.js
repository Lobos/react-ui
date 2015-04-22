module.exports = {
  options: {
    transform:  [ require('grunt-react').browserify ],
    browserifyOptions: {
      debug: false,
      standalone: 'App'
    },
  },
  docs: {
    src: './docs/js/app.jsx',
    dest: './dist/docs/js/app.js'
  },
  publish: {
    src: './src/js/index.js',
    dest: './dist/publish/js/react-ui.js',
    options: {
      browserifyOptions: {
        debug: false,
        standalone: 'ReactUI'
      }
    }
  }
}
