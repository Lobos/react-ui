var path = require('path')

module.exports = require("./make-webpack-config")({
  entry: {
    app: "./docs/src/js/app.jsx",
    docs: "./docs/src/less/style.less"
  },
  separateStylesheet: true,
  externals: {"react": "React", "react-dom": "ReactDOM"},
  path: path.join(__dirname, 'docs/dist')
  //library: "app"
});
