module.exports = {
  docsAssets: {
    files: [
      {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts', 
        src: ['**'], 
        dest:'dist/docs/fonts' 
      },
      {
        expand: true,
        cwd: 'docs/js', 
        src: ['prettify.js'], 
        dest:'dist/docs/js' 
      }
    ]
  },

  docsHtml: {
    files: [
      { 
        expand: true,
        cwd: 'docs/', 
        src: ['**/*.html'], 
        dest:'dist/docs/' 
      }
    ]
  },

  publish: {
    files: [
      {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts', 
        src: ['**'], 
        dest:'dist/publish/fonts' 
      }
    ]
  }
}
