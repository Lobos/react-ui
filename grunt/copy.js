module.exports = {
  assets: {
    files: [
      {
        expand: true,
        cwd: 'src/md-font/fonts', 
        src: ['**'], 
        dest:'dist/fonts' 
      }
    ]
  }

}
