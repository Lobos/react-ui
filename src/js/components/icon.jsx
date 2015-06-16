"use strict"

require('../../less/icon.less')

var React = require('react')
var Classable = require('../mixins/classable')

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string,
    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    spin: React.PropTypes.bool
  },

  mixins: [Classable],

  getInitialState: function () {
    return {
      spin: this.props.spin
    }
  },

  spin: function () {
    this.setState({ spin: true })
  },

  unspin: function () {
    this.setState({ spin: false })
  },

  render: function () {
    var classes = {
      'icon': true,
      'icon-spin': this.state.spin
    }
    if (this.props.icon) {
      classes['icon-' + this.props.icon] = true
    }

    var size = this.props.size
    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x'
      }
      classes['icon-' + size] = true
    }

    var className = this.getClasses(classes)

    return (
      <i className={className}></i>
    )
  }
})

module.exports = Icon
