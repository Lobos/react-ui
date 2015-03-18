var React = require('react')
var Router = require('react-router')
var Route = Router.Route
//var Redirect = Router.Redirect
var DefaultRoute = Router.DefaultRoute

var Master = require('./pages/master.jsx')
var Home = require('./pages/home.jsx')
var Icon = require('./pages/icon.jsx')
var Loading = require('./pages/loading.jsx')


var AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    <Route name="icon" handler={Icon} />
    <Route name="loading" handler={Loading} />

    <DefaultRoute handler={Home} />
  </Route>
)

module.exports = AppRoutes
