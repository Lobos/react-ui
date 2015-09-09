'use strict'

import React from 'react'
import classnames from 'classnames'
import getGrid from './higherorder/grid'

@getGrid
export default class Grid extends React.Component {
  static displayName = 'Grid'

  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  }

  render () {
    const className = classnames(
      this.props.className,
      this.getGrid()
    )
    return (
      <div style={this.props.style} className={className}>
        {this.props.children}
      </div>
    )
  }
}
