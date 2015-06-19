"use strict"

let classnames = require('classnames')
let React = require('react')
let Router = require('react-router')
let menulist = require('./menulist')
let Icon = require('../../../src/js/components/icon.jsx')

module.exports = React.createClass({
  displayName: 'NavList',

  propTypes: {
    onToggle: React.PropTypes.func
  },

  mixins: [Router.State],

  getInitialState: function () {
    return {
      active: false
    }
  },

  getClasses: function (name, route) {
    return classnames(name, {
      active: this.context.router.isActive(route)
    })
  },

  routeChange: function (route) {
    this.context.router.transitionTo(route)
    this.setState({ active: false })
    this.props.onToggle(false)
  },

  toggle: function () {
    let active = !this.state.active
    this.setState({ active: active })
    this.props.onToggle(active)
  },

  render: function () {
    let list = menulist.map(function (m) {
      if (m.route) {
        return (
          <li className="pure-menu-item">
            <a onClick={this.routeChange.bind(this, m.route)} className={this.getClasses("pure-menu-link", m.route)}>{m.text}</a>
          </li>
        )
      } else if (m.hr) {
        return (<hr />)
      }
    }, this)

    return (
      <div className={classnames("nav", {active: this.state.active})}>
        <div className="nav-list pure-menu">
          <a onClick={this.toggle} className="nav-handler"><Icon icon="navicon" size="lg" /></a>
          <a className="pure-menu-heading" onClick={this.routeChange.bind(this, '/')}>React UI</a>
          <ul className="pure-menu-list">{list}</ul>
        </div>
        <div onClick={this.toggle} className="overlay"></div>
      </div>
    )
  }
})
