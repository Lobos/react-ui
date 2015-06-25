"use strict"

require('../../less/grid.less')

let React = require('react')
const classnames = require('classnames')

module.exports = {

  propTypes: {
    className: React.PropTypes.string,
    responsive: React.PropTypes.string,
    width: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      responsive: 'md'
    }
  },

  getClasses: function() {
    let args = Array.prototype.slice.call(arguments)
    if (this.props.className) {
      args.push(this.props.className)
    }

    let width = parseInt(this.props.width)
    if (width && width <= 24) {
      let resp = this.props.responsive
      if (resp) {
        args.push(`pure-u-1 pure-u-${resp}-${width}-24`)
      } else {
        args.push(`pure-u-${width}-24`)
      }
    }

    return classnames(...args)
  }
}
