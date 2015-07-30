'use strict'

import React from 'react'

class TableHeader extends React.Component {
  static displayName = 'TableHeader'

  static propTypes = {
    children: React.PropTypes.any,
    content: React.PropTypes.any.isRequired
  }

  render () {
    return (
      <th>{this.props.children}</th>
    )
  }
}

export default TableHeader
