'use strict'

import {Route, Router} from 'react-router'
import Master from './pages/master.jsx'
import Home from './pages/home.jsx'
import FormBuilder from './pages/formBuilder.jsx'
import createHistory from 'history/lib/createHashHistory'

const history = createHistory({ queryKey: false })
let menulist = []

require('./menuList').forEach(function (menu, index) {
  if (typeof menu === 'object' && menu.component) {
    menulist.push(
      <Route key={index} path={menu.path} component={menu.component} />
    )
  }
})

const AppRoutes = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" indexRoute={{component: Home}} component={Master}>
      <Route path="/home" component={Home} />
      {menulist}
      <Route path="/form-builder" component={FormBuilder} />
    </Route>
  </Router>
)

module.exports = AppRoutes
