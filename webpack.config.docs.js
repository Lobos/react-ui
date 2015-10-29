module.exports = require("./make-webpack-config")({
  entry: {
    app: "./docs/src/js/app.jsx",
    docs: "./docs/src/less/style.less"
  },
  separateStylesheet: true,
  minimize: true,
  externals: {"react": "React", "react-dom": "ReactDOM"},
  path: 'docs/dist'
})
