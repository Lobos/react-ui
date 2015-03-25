var React = require('react')
var Router = require('react-router')
var AppRoutes = require('./app-routes.jsx')


Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
})
.run(function (Handler) {
  React.render(<Handler/>, document.body)
})

window.React = React
