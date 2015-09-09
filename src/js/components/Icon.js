"use strict"

import React from 'react'
import classnames from 'classnames'
let prefix = "icon"

export default class Icon extends React.Component {
  static displayName = 'Icon'

  static propTypes = {
    icon: React.PropTypes.string,
    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    spin: React.PropTypes.bool,
    style: React.PropTypes.object
  }

  static setPrefix (pre) {
    prefix = pre
  }

  state = {
    spin: this.props.spin
  }

  spin () {
    this.setState({ spin: true })
  }

  unspin () {
    this.setState({ spin: false })
  }

  render () {
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
      <i style={this.props.style} className={classnames(...classes)}></i>
    )
  }
}
