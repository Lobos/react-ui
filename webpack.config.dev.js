'use strict';

var path = require('path');
var webpack = require('webpack');

var config = require("./make-webpack-config")({
  entry: [
    'webpack-hot-middleware/client', 
    "./docs/src/js/app.jsx",
    "./docs/src/less/style.less"
  ],
  hotComponents: true,
  externals: {"react": "React", "react-dom": "ReactDOM"},
  path: path.join(__dirname, 'docs'),
  filename: "js/app.js",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

module.exports = config;

