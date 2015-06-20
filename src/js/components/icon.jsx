"use strict"

let React = require('react')
let Classable = require('../mixins/classable')
let prefix = "icon"

let Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string,
    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    spin: React.PropTypes.bool,
    style: React.PropTypes.object
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
    let classes = [`${prefix}`]

    if (this.state.spin) {
      classes.push(`${prefix}-spin`)
    }

    if (this.props.icon) {
      classes.push(`${prefix}-${this.props.icon}`)
    }

    let size = this.props.size
    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x'
      }
      classes.push(`${prefix}-${size}`)
    }

    return (
      <i style={this.props.style} className={this.getClasses(...classes)}></i>
    )
  }
})

Icon.setPrefix = function (pre) {
  prefix = pre
}

module.exports = Icon
