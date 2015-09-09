"use strict"

import React from 'react'
import classnames from 'classnames'

import { requireCss } from './themes'
requireCss('overlay')

export default class Overlay extends React.Component {
  static displayName = 'Overlay'

  static propTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
  }

  static defaultProps = {
    onClick: function () {}
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-overlay'
    )

    return (
      <div className={className} style={this.props.style} onClick={this.props.onClick} />
    )
  }
}
