"use strict"

import React from 'react'
import classnames from 'classnames'
import menulist from './menulist'
const { Icon } = global.uiRequire()

export default class NavList extends React.Component {
  static displayName = 'NavList'

  static propTypes = {
    onToggle: React.PropTypes.func
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  state = {
    active: true
  }

  getClasses (name, route) {
    return classnames(name, {
      active: this.context.router.isActive(route)
    })
  }

  routeChange (route) {
    this.context.router.transitionTo(route)
  }

  getRoutesList (routes, index) {
    let list = routes.map(function (r, i) {
      if (r.route) {
        return (
          <li key={i} className="pure-menu-item">
            <a onClick={this.routeChange.bind(this, r.route)} className={this.getClasses("pure-menu-link", r.route)}>{r.text}</a>
          </li>
        )
      } else if (r.hr) {
        return (<hr key={i} />)
      } else if (r.text) {
        return (
          <li key={i} className="pure-menu-item">
            <span className="pure-menu-link">{r.text}</span>
          </li>
        )
      }
    }, this)

    return <ul key={index} className="pure-menu-list">{list}</ul>
  }

  render () {
    let list = menulist.map(function (routes, index) {
      return this.getRoutesList(routes, index)
    }, this)

    return (
      <div className={classnames("nav", {active: this.state.active})}>
        <a className="pure-menu-heading" onClick={this.routeChange.bind(this, '/')}>React UI</a>
        <a className="link-github" href="https://github.com/Lobos/react-ui"><Icon size={2} icon="github" /></a>
        <div className="nav-inner">
          <div ref="list" className="nav-list">
            {list}
          </div>
        </div>
      </div>
    )
  }
}
