"use strict";

// static files
require('file?name=index.html!../index.html');
require('../../../node_modules/purecss/build/base.css');
require('../less/style.less');

var React = require('react');

React.render(
  <h1>Hello, world!</h1>,
  document.body
);

