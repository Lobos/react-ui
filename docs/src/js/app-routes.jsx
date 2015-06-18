"use strict"

import {Route, DefaultRoute} from 'react-router'

import Master from './pages/master.jsx'
import Home from './pages/home.jsx'

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

export default AppRoutes
