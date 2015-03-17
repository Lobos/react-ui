module.exports = {
  assets: {
    files: [
      {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts', 
        src: ['**'], 
        dest:'dist/fonts' 
      }
    ]
  }

}
