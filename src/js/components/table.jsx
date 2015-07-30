'use strict'

import React from 'react'
import classnames from 'classnames'
import { substitute } from '../utils/strings'

import styles from '../../less/tables.less'

class Table extends React.Component {
  static displayName = 'Table'

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]).isRequired,
    header: React.PropTypes.array.isRequired
  }

  componentWillMount () {
    this.fetchData(this.props.data)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.fetchData(nextProps.data)
    }
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
      let tds = this.props.header.map((h, j) => {
        let content = h.props.content
        if (typeof content === 'string') {
          return <td key={j}>{substitute(content, d)}</td>
        } else if (typeof content === 'function') {
          return <td key={i}>{content(d)}</td>
        }
      })
      return <tr key={i}>{tds}</tr>
    })

    return <tbody>{trs}</tbody>
  }

  render () {
    let className = classnames(
      this.props.className,
      styles.table
    )

    return (
      <table className={className}>
        <thead>{this.props.header}</thead>
        {this.renderBody()}
      </table>
    )
  }
}

export default Table
