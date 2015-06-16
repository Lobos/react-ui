"use strict"

var React = require("react")
var RouteHandler = require('react-router').RouteHandler
var NavList = require('../nav-list.jsx')
var Message = require('../../../../src/js/components/message.jsx')

module.exports = React.createClass({
  displayName: 'Master',

  render: function () {
    return (
      <div>
        <NavList />
        <div className="main"><RouteHandler /></div>
        <Message />
      </div>
    )
  }
})

