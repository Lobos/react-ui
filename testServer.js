'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require("./webpack.config.test.js");

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'test/components/index.html'));
});

module.exports = {
  start: function (port) {
    return new Promise((resolve, reject)=> {
      app.listen(port || '3001', 'localhost', function (err) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve();
      });
    })

  },

  close: function () {
    app.close();
  }
};
