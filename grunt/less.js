module.exports = {
  options: {
    compress: true,
    yuicompress: true,
    optimization: 2
  },
  publish: {
    files: {
      "./dist/publish/css/style.css": "./src/less/react-ui.less"
    }
  },
  docs: {
    files: {
      "./dist/docs/css/style.css": "./docs/less/style.less"
    }
  }
}
