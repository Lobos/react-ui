'use strict'

import React from 'react'
import classnames from 'classnames'

class Table extends React.Component {
  static displayName = 'Table'

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]).isRequired,
    headers: React.PropTypes.array.isRequired
  }

  componentWillMount () {
    this.fetchData(this.props.data)
  }

  state = {
    data: []
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data(res => {
        this.fetchData(res)
      })
    } else {
      this.setState({ data })
    }
  }

  renderBody () {
    let trs = this.state.data.map((d, i) => {
      let tds = this.props.headers.map((h, j) => {
        return <td key={j}>{d.name}</td>
      })
      return <tr key={i}>{tds}</tr>
    })

    return <tbody>{trs}</tbody>
  }

  render () {
    let className = classnames(
      this.props.className,
      'table'
    )

    return (
      <table className={className}>
        {this.renderBody()}
      </table>
    )
  }
}

export default Table
