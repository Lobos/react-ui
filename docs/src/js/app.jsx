"use strict"

import React from 'react'
import Router from 'react-router'
import AppRoutes from './app-routes.jsx'

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
