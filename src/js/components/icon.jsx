"use strict"

let React = require('react')
let Classable = require('../mixins/classable')

module.exports = React.createClass({
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
    let classes = ['icon']

    if (this.state.spin) {
      classes.push('icon-spin')
    }

    if (this.props.icon) {
      classes.push(`icon-${this.props.icon}`)
    }

    let size = this.props.size
    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x'
      }
      classes.push(`icon-${size}`)
    }

    return (
      <i className={this.getClasses(...classes)}></i>
    )
  }
})
