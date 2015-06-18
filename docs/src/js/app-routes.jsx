"use strict"

import {Route, DefaultRoute} from 'react-router'

let Master = require('./pages/master.jsx')
let Home = require('./pages/home.jsx')

let menulist = []
require('./menulist').forEach(function (menu) {
  if (menu.handler) {
    menulist.push(
      <Route name={menu.route} handler={menu.handler} />
    )
  }
})

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    {menulist}
    <DefaultRoute handler={Home} />
  </Route>
)

module.exports = AppRoutes
