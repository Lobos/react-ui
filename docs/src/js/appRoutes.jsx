'use strict'

import {Route, Router, hashHistory} from 'react-router'
import Master from './pages/master.jsx'
import Home from './pages/home.jsx'

let menulist = []

require('./menuList').forEach(function (menu, index) {
  if (typeof menu === 'object' && menu.component) {
    menulist.push(
      <Route key={index}
        path={menu.path}
        component={menu.component} />
    )
  }
})

function scrollTop () {
  window.scrollTo(0, 0)
}

const AppRoutes = (
  <Router onUpdate={scrollTop} history={hashHistory}>
    <Route path="/" indexRoute={{component: Home}} component={Master}>
      <Route path="/home" component={Home} />
      {menulist}
    </Route>
  </Router>
)

module.exports = AppRoutes
