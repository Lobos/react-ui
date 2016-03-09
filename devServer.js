'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require("./webpack.config.dev.js");

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('docs/dist'));
app.use('/images', express.static('docs/src/images'));
app.use('/lib', express.static('docs/lib'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/index.html'));
});

/*
app.get('/images/:file', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/images/' + req.params.file));
});

app.get('/lib/:file', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/lib/' + req.params.file));
});

app.get('/raw/*', function(req, res) {
  var file = req.path.replace('/raw', path.join(__dirname, 'docs/src/js/pages'));
  res.sendFile(file);
});
*/

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
