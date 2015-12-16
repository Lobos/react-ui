"use strict";

global.uiRequire = function (src) {
  if (src) {
    return require('../../../src/' + src);
  } else {
    return require('../../../src/');
  }
};

import ReactDOM from 'react-dom';
const AppRoutes = require('./app-routes.jsx');

ReactDOM.render(
  AppRoutes,
  document.getElementById('body')
);

// static files
require('file?name=index.html!../index.html');
require('../json/countries.json');
require('../json/form.json');
require('../json/table.json');
require('../json/text-value.json');
require('../json/tree.json');
require('../less/style.less');
