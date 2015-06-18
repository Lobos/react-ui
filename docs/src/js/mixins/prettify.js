"use strict"

import React from 'react'

module.exports = {
  componentDidMount: function () {
    let node = React.findDOMNode(this)
    window.prettyPrint(null, node)
  }
}
