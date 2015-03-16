module.exports = {
  options: {
    compress: true,
    yuicompress: true,
    optimization: 2
  },
  admin: {
    files: {
      "./dist/css/style.css": "./src/less/react-ui.less"
    }
  }
}
