"use strict"

let classnames = require('classnames')
let React = require('react')
let Router = require('react-router')
let menulist = require('./menulist')
let Icon = require('../../../src/js/components/icon.jsx')
let Dom = require('../../../src/js').Utils.Dom

module.exports = React.createClass({
  displayName: 'NavList',

  propTypes: {
    onToggle: React.PropTypes.func
  },

  mixins: [Router.State],

  getInitialState: function () {
    return {
      active: false,
      height: 0
    }
  },

  componentDidMount: function () {
    let height = Dom.getOuterHeight(React.findDOMNode(this))
    this.setState({ height })
  },

  getClasses: function (name, route) {
    return classnames(name, {
      active: this.context.router.isActive(route)
    })
  },

  routeChange: function (route) {
    this.context.router.transitionTo(route)
    if (this.state.active) {
      this.toggle()
    }
  },

  toggle: function () {
    let active = !this.state.active
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
  },

  getRoutesList: function (routes, index) {
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
  },

  render: function () {
    let list = menulist.map(function (routes, index) {
      return this.getRoutesList(routes, index)
    }, this)

    return (
      <div className={classnames("nav", {active: this.state.active})}>
        <a className="pure-menu-heading" onClick={this.routeChange.bind(this, '/')}>React UI</a>
        <div className="nav-inner pure-menu">
          <a onClick={this.toggle} className="nav-handler"><Icon icon="menu" size="lg" /></a>
          <div ref="list" className="nav-list">
            {list}
          </div>
        </div>
        <div onClick={this.toggle} className="overlay"></div>
      </div>
    )
  }
})
