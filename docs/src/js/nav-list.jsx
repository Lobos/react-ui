"use strict"

import React from 'react'
import classnames from 'classnames'
//import Router from 'react-router'
import menulist from './menulist'
const {Icon, Utils: {Dom} } = global.uiRequire()

export default class NavList extends React.Component {
  static displayName = 'NavList'

  static propTypes = {
    onToggle: React.PropTypes.func
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  state = {
    active: false,
    height: 0
  }

  getClasses (name, route) {
    return classnames(name, {
      active: this.context.router.isActive(route)
    })
  }

  routeChange (route) {
    this.context.router.transitionTo(route)
    if (this.state.active) {
      this.close()
    }
  }

  mouseMove (active) {
    if (active !== undefined && active !== this.state.active) {
      console.log(active)
      this.toggle(active)
    }
  }

  toggle (active) {
    if (active === undefined) {
      active = !this.state.active
    }
    let rs = React.findDOMNode(this.refs.list).style
    rs.display = active ? 'block' : 'none'

    if (active) {
      let height = window.innerHeight || document.documentElement.clientHeight
      rs.maxHeight = (height - this.state.height) + 'px'
    }

    setTimeout(() => {
      this.setState({ active })
      this.props.onToggle(active)
    }, 0)
  }

  show () {
    if (this.state.active) {
      return
    }

    let rs = React.findDOMNode(this.refs.list).style
    rs.display = 'block'
    let height = window.innerHeight || document.documentElement.clientHeight
    let navheight = Dom.getOuterHeight(React.findDOMNode(this))
    rs.maxHeight = (height - navheight) + 'px'

    setTimeout(() => {
      this.setState({ active: true })
      this.props.onToggle(true)
    }, 0)
  }

  close () {
    if (this.state.active === false) {
      return
    }

    this.setState({ active: false })
    setTimeout(() => {
      React.findDOMNode(this.refs.list).style.display = 'none'
      this.props.onToggle(false)
    }, 300)
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
        <a className="link-github" href="https://github.com/Lobos/react-ui"><Icon icon="github" /> github</a>
        <div onMouseEnter={this.show.bind(this)} onMouseLeave={this.close.bind(this)} className="nav-inner pure-menu">
          <a onClick={this.show.bind(this)} className="nav-handler"><Icon icon="menu" size="lg" /></a>
          <div ref="list" className="nav-list">
            <div className="mouse-move-pad" />
            {list}
          </div>
        </div>
        <div onClick={this.close.bind(this)} className="overlay"></div>
      </div>
    )
  }
}
