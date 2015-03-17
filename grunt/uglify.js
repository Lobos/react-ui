module.exports = {
  options: {
    //sourceMap: true
  },

  publish: {
    files: {
      './dist/publish/js/react-ui.min.js':['./dist/publish/js/react-ui.js']
    }
  },

  docs: {
    files: {
      './dist/docs/js/app.min.js':['./dist/docs/js/app.js']
    }
  }
}
