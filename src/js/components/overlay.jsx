"use strict"

require('../../less/overlay.less')
import React from 'react'
import Classable from '../mixins/classable'

module.exports = React.createClass({
  displayName: 'Overlay',

  propTypes: {
    onClick: React.PropTypes.func
  },

  mixins: [Classable],

  getDefaultProps: function () {
    return {
      onClick: function () {}
    }
  },

  render: function () {
    let className = this.getClasses('overlay')

    return (
      <div className={className} onClick={this.props.onClick} />
    )
  }
})
