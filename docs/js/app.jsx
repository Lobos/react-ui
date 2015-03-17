var React = require('react')
var Router = require('react-router')
var AppRoutes = require('./app-routes.jsx')
var Lang = require('./libs').Utils.Lang

Lang.set(require('./lang/zh-cn'))

Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
})
.run(function (Handler) {
  React.render(<Handler/>, document.body)
})

window.React = React
