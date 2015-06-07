"use strict";

// static files
require('file?name=index.html!../index.html');
require('../../../node_modules/purecss/build/base.css');
require('../less/prettify.css');
require('../less/style.less');

var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./app-routes.jsx');

Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
})
.run(function (Handler) {
  React.render(<Handler />, document.body);
});
