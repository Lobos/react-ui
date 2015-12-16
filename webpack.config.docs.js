module.exports = require("./make-webpack-config")({
  entry: {
    app: "./docs/src/js/app.jsx"
  },
  minimize: true,
  externals: {"react": "React", "react-dom": "ReactDOM"},
  path: 'docs/dist'
})
