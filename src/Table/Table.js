'use strict'

import React, { Component } from 'react'
import classnames from 'classnames'
import { substitute, toArray } from '../utils/strings'
import { shallowEqual, hashcode } from '../utils/objects'
import PropTypes from '../utils/proptypes'
import Header from './Header'
import Pagination from '../Pagination'
import Checkbox from '../Checkbox'
import ValuesHolder from '../ValuesHolder'

import _tables from '../styles/_tables.scss'

export default class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.isWidthSetted = false
    this.onBodyScroll = this.onBodyScroll.bind(this)

    // cache for handleSelect
    if (props.onSelect) {
      this.values = (props.onSelect instanceof ValuesHolder)
                    ? props.onSelect : new ValuesHolder()
      this.values.init(toArray(props.value, props.sep))
    }
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
    if (!this.isWidthSetted) this.setHeaderWidth()
  }

  setHeaderWidth () {
    let body = this.refs.body
    if (!body) {
      this.isWidthSetted = true
      return
    }

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
    const { onSelect, data, sep } = this.props

    let value = d === 'all' ? data.map(d => d.$value) : d.$value
    this.values[checked ? 'add' : 'remove'](value)

    if (typeof onSelect === 'function') {
      onSelect(this.values.getValue(sep))
    }
    this.setState({})
  }

  renderBody (values, columns) {
    if (!columns) return

    const { data, onSelect, valueTpl } = this.props

    if (!Array.isArray(data)) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length + (onSelect ? 1 : 0)}>{data}</td>
          </tr>
        </tbody>
      )
    }

    const headerKeys = columns.map((h) => {
      return h.name || hashcode(h)
    })

    this.allSelected = true
    let trs = data.map((d, i) => {
      let tds = []
      if (onSelect) {
        if (!d.$value) d.$value = substitute(valueTpl, d)

        let checked = values.indexOf(d.$value) >= 0
        this.allSelected = this.allSelected && checked

        tds.push(
          <td className={_tables.checkbox} key="checkbox">
            <Checkbox isIndicator
              checked={checked}
              onChange={this.handleSelect.bind(this, d)} />
          </td>
        )
      }
      let rowKey = d.id ? d.id : hashcode(d)
      columns.map((h, j) => {
        if (h.hidden) return

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

  renderColgroup (columns) {
    const { onSelect } = this.props
    let cols = []
    if (onSelect) {
      cols.push(<col key="check" />)
    }
    columns.forEach((h, i) => {
      cols.push(<col key={i} style={h.width ? { width: h.width } : undefined} />)
    })
    return <colgroup>{cols}</colgroup>
  }

  getColumns () {
    return this.props.columns || this.props.headers
  }

  renderHeader (columns) {
    const { onSort, onSelect, sortStatus, pagination = {} } = this.props

    let headers = []
    if (onSelect) {
      headers.push(
        <Header key="checkbox" name="$checkbox">
          <Checkbox isIndicator
            checked={this.allSelected}
            onChange={this.handleSelect.bind(this, 'all')} />
        </Header>
      )
    }

    columns.forEach((header, i) => {
      if (header.hidden) return

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

    const { children, height, width, bordered, striped } = this.props
    const values = this.values ? this.values.getValue() : []
    const columns = this.getColumns()
    const body = this.renderBody(values, columns)

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
        { columns &&
          <div className={_tables.header}>
            <div ref="headerContainer" style={headerStyle}>
              <table ref="header">
                { this.renderColgroup(columns) }
                { this.renderHeader(columns) }
              </table>
            </div>
          </div>
        }

        <div className={_tables.body} onScroll={onBodyScroll} style={bodyStyle}>
          <table style={tableStyle} ref="body">
            { children }
            { columns && this.renderColgroup(columns) }
            { columns && body }
          </table>
        </div>

        {this.renderPagination()}
      </div>
    )
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  filters: PropTypes.array,
  headers: PropTypes.array,
  height: PropTypes.number_string,
  onSelect: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(ValuesHolder)
  ]),
  onSort: PropTypes.func,
  pagination: PropTypes.object,
  sep: PropTypes.func_string,
  sortStatus: PropTypes.object,
  striped: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.array_string,
  valueTpl: PropTypes.tpl,
  width: PropTypes.number_string
}

Table.defaultProps = {
  data: [],
  sep: ','
}
