"use strict"

require('../../less/overlay.less')
import React from 'react'
import classnames from 'classnames'

export default class Overlay extends React.Component {
  static displayName = 'Overlay'

  static propTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    onClick: function () {}
  }

  render () {
    let className = classnames(
      this.props.className,
      'overlay'
    )

    return (
      <div className={className} onClick={this.props.onClick} />
    )
  }
}
