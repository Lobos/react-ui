'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var path = require('path')

var config = require("./make-webpack-config")({
  entry: {
    app: ['webpack-hot-middleware/client', "./docs/src/js/app.jsx"],
    docs: "./docs/src/less/style.less"
  },
  hotComponents: true,
  separateStylesheet: true,
  externals: {"react": "React", "react-dom": "ReactDOM"},
  path: path.join(__dirname, 'docs/dist'),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/dist/index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
