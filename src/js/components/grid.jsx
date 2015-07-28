'use strict'

import React from 'react'
import getGrid from '../higherorder/grid'

@getGrid
export default class Grid extends React.Component {
  static displayName = 'Grid'

  static propTypes = {
    children: React.PropTypes.any
  }

  render () {
    return (
      <div className={this.getGrid()}>
        {this.props.children}
      </div>
    )
  }
}
