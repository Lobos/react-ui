"use strict"

let React = require('react')
let classnames = require('classnames')

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getClasses: function() {
    let mainArguments = Array.prototype.slice.call(arguments)
    if (this.props.className) {
      mainArguments.push(this.props.className)
    }

    return classnames(...mainArguments)
  }
}
