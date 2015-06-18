"use strict"

import {RouteHandler} from 'react-router'
let React = require("react")
let NavList = require('../nav-list.jsx')
let Message = require('../../../../src/js/components/message.jsx')

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

