"use strict"

import {RouteHandler} from 'react-router'
let React = require("react")
let classnames = require('classnames')
let NavList = require('../nav-list.jsx')
let {Message} = global.uiRequire()

module.exports = React.createClass({
  displayName: 'Master',

  getInitialState: function () {
    return {
      navShow: false
    }
  },

  navToggle: function (show) {
    this.setState({ navShow: show })
  },

  render: function () {
    return (
      <div className={classnames({ 'nav-show': this.state.navShow })}>
        <NavList onToggle={this.navToggle} />
        <div className="main"><RouteHandler /></div>
        <Message />
      </div>
    )
  }
})

