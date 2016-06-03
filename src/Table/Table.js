'use strict'

import React, { Component } from 'react'
import classnames from 'classnames'
import { substitute } from '../utils/strings'
import { shallowEqual, hashcode } from '../utils/objects'
import PropTypes from '../utils/proptypes'
import Header from './Header'
import Pagination from '../Pagination'
import Checkbox from '../Checkbox'

import _tables from '../styles/_tables.scss'

export default class Table extends Component {
  constructor (props, context) {
    super(props, context)
    this.onBodyScroll = this.onBodyScroll.bind(this)
    this.isWidthSetted = false
  }

  componentDidMount () {
    this.setHeaderWidth()
  }

  componentWillReceiveProps (nextProps) {
    if (!shallowEqual(this.props.pagination, nextProps.pagination)) {
      this.isWidthSetted = false
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth()
  }

  setHeaderWidth () {
    if (this.isWidthSetted) return

    let body = this.refs.body

    let tr = body.querySelector('tr')
    if (!tr) return

    let tds = tr.querySelectorAll('td')
    if (tds.length <= 1) return

    this.isWidthSetted = true

    let bodyCgs = body.querySelectorAll('col')
    let headCgs = this.refs.header.querySelectorAll('col')

    for (let i = 0, count = tds.length; i < count; i++) {
      let width = tds[i].offsetWidth + 'px'
      headCgs[i].style.width = width
      bodyCgs[i].style.width = width
    }
  }

  onBodyScroll (e) {
    let hc = this.refs.headerContainer
    hc.style.marginLeft = (0 - e.target.scrollLeft) + 'px'
  }

  handleSelect (d, e, checked) {
    console.log(d, e, checked)
  }

  renderBody (data) {
    const { selectAble } = this.props
    const columns = this.getColumns()

    if (!Array.isArray(data)) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + (selectAble ? 1 : 0)}>{data}</td>
          </tr>
        </tbody>
      )
    }

    const headerKeys = columns.map((h) => {
      return h.name || hashcode(h)
    })

    let trs = data.map((d, i) => {
      let tds = []
      if (selectAble) {
        tds.push(
          <td className={_tables.checkbox} key="checkbox">
            <Checkbox isIndicator onChange={this.handleSelect.bind(this, d)} />
          </td>
        )
      }
      let rowKey = d.id ? d.id : hashcode(d)
      columns.map((h, j) => {
        if (h.hidden) {
          return
        }
        let content = h.content
        if (typeof content === 'string') {
          content = substitute(content, d)
        } else if (typeof content === 'function') {
          content = content(d)
        } else {
          content = d[h.name]
        }
        tds.push(<td key={headerKeys[j]}>{content}</td>)
      })
      return <tr key={rowKey}>{tds}</tr>
    })

    return <tbody>{trs}</tbody>
  }

  renderColgroup () {
    const { selectAble } = this.props
    let cols = []
    if (selectAble) {
      cols.push(<col key="check" />)
    }
    this.getColumns().forEach((h, i) => {
      cols.push(<col key={i} style={h.width ? { width: h.width } : undefined} />)
    })
    return <colgroup>{cols}</colgroup>
  }

  getColumns () {
    return this.props.columns || this.props.headers()
  }

  renderHeader () {
    let headers = []
    if (this.props.selectAble) {
      headers.push(
        <Header key="checkbox" name="$checkbox">
          <Checkbox isIndicator onChange={this.handleSelect.bind(this, 'all')} />
        </Header>
      )
    }

    const { onSort, sortStatus, pagination = {} } = this.props

    this.getColumns().forEach((header, i) => {
      if (header.hidden) {
        return
      }

      headers.push(
        <Header {...header}
          key={header.name || i}
          onPageChange={pagination.onChange}
          onSort={onSort}
          sortStatus={sortStatus}
        />
      )
    })
    return <thead><tr>{headers}</tr></thead>
  }

  renderPagination () {
    const { pagination } = this.props
    if (!pagination) return

    return (
      <div className={_tables[`pagi-${pagination.position}`]}>
        <Pagination {...pagination} />
      </div>
    )
  }

  render () {
    let bodyStyle = {}
    let headerStyle = {}
    let tableStyle = {}
    let onBodyScroll = null

    const { data, height, width, bordered, striped } = this.props

    if (height && height !== 'auto') {
      bodyStyle.height = height
      bodyStyle.overflow = 'auto'
    }

    if (width && width !== 'auto') {
      headerStyle.width = width
      tableStyle.width = width
      bodyStyle.overflow = 'auto'
      onBodyScroll = this.onBodyScroll
    }

    let className = classnames(
      this.props.className,
      _tables.table,
      bordered && _tables.bordered,
      height && _tables.scrolled,
      striped && _tables.striped
    )

    return (
      <div style={this.props.style} className={className}>
        <div className={_tables.header}>
          <div ref="headerContainer" style={headerStyle}>
            <table ref="header">
              { this.renderColgroup() }
              { this.renderHeader() }
            </table>
          </div>
        </div>

        <div className={_tables.body} onScroll={onBodyScroll} style={bodyStyle}>
          <table style={tableStyle} ref="body">
            { this.renderColgroup() }
            { this.renderBody(data) }
          </table>
        </div>

        {this.renderPagination()}
      </div>
    )
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  filters: PropTypes.array,
  headers: PropTypes.array,
  height: PropTypes.number_string,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
  pagination: PropTypes.object,
  selectAble: PropTypes.bool,
  sortStatus: PropTypes.object,
  striped: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.number_string
}

Table.contextTypes = {
  dataHolder: PropTypes.object
}

Table.defaultProps = {
  data: []
}
