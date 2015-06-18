"use strict"

let React = require('react')

module.exports = {
  componentDidMount: function () {
    let node = React.findDOMNode(this)
    window.prettyPrint(null, node)
  }
}
