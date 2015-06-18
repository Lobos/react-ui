"use strict"

import React from 'react'
import classnames from 'classnames'

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getClasses: function() {
    var mainArguments = Array.prototype.slice.call(arguments)
    if (this.props.className) {
      mainArguments.push(this.props.className)
    }

    return classnames(...mainArguments)
  }
}
