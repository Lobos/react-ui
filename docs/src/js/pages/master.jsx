"use strict"

import React from "react"
import {RouteHandler} from 'react-router'
import NavList from '../nav-list.jsx'
import Message from '../../../../src/js/components/message.jsx'

export default React.createClass({
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

