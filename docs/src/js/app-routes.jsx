"use strict";

var _ = require('underscore');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./pages/master.jsx');
var Home = require('./pages/home.jsx');

var menulist = [];
_.forEach(require('./menulist'), function (menu) {
  if (menu.handler) {
    menulist.push(
      <Route name={menu.key} handler={menu.handler} />
    );
  }
});


var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    {menulist}
    <DefaultRoute handler={Home} />
  </Route>
);

module.exports = AppRoutes;
