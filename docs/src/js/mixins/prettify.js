"use strict"

import React from 'react'

export default {
  componentDidMount: function () {
    let node = React.findDOMNode(this)
    window.prettyPrint(null, node)
  }
}
