'use strict'

import React from 'react'
import classnames from 'classnames'

class TableHeader extends React.Component {
  static displayName = 'TableHeader'

  static propTypes = {
    children: React.PropTypes.any,
    content: React.PropTypes.any,
    hidden: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onSort: React.PropTypes.func,
    sort: React.PropTypes.object,
    sortAble: React.PropTypes.bool,
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  }

  static defaultProps = {
    hidden: false
  }

  state = {
    asc: 0
  }

  onSort () {
    let asc = this.state.asc === 0 ? 1 : 0
    this.setState({ asc })
    this.props.onSort(this.props.name, asc)
  }

  render () {
    let sort = [],
        onSort = null,
        style = {}

    if (this.props.sortAble) {
      sort.push(<i key="up" className={classnames("arrow-up", {active: this.props.name === this.props.sort.name && this.state.asc === 1})} />)
      sort.push(<i key="down" className={classnames("arrow-down", {active: this.props.name === this.props.sort.name && this.state.asc === 0})} />)

      onSort = this.onSort.bind(this)
      style = { cursor: 'pointer' }
    }

    return (
      <th style={style} onClick={onSort}>
        {this.props.children}
        {sort}
      </th>
    )
  }
}

export default TableHeader
