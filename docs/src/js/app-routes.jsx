"use strict"

import {Route, DefaultRoute} from 'react-router'
import Master from './pages/master.jsx'
import Home from './pages/home.jsx'

let menulist = []
let index = 1

function addMenu(list) {
  list.forEach(function (menu) {
    if (menu.handler) {
      menulist.push(
        <Route key={index} name={menu.route} handler={menu.handler} />
      )
    }
    index++
  })
}
require('./menulist').forEach(function (list) {
  addMenu(list)
})

const AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    {menulist}
    <Route name="build" handler={require('./pages/build.jsx')} />
    <DefaultRoute handler={Home} />
  </Route>
)

export default AppRoutes
