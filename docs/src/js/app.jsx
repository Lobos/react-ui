"use strict"

let React = require('react')
let Router = require('react-router')
let AppRoutes = require('./app-routes.jsx')

// load language
require('../../../src/js/lang/zh-cn')

Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
})
.run(function (Handler) {
  React.render(<Handler />, document.body)
})

// static files
require('file?name=index.html!../index.html')
require('../json/form.json')
require('../json/text-value.json')
require('../json/tree.json')
