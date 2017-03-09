import React, { Component } from 'react'
import classnames from 'classnames'
import { substitute, toArray } from '../utils/strings'
import { shallowEqual, hashcode } from '../utils/objects'
import PropTypes from '../utils/proptypes'
import Pagination from '../Pagination'
import { Checkbox } from '../Checkbox'
import ArrayHolder from '../ArrayHolder'
import { FETCH_PENDING } from '../higherOrders/Fetch'
import Mask from '../Mask'
import { getLang } from '../lang'

import Header from './Header'
import Tr from './Tr'

import _tables from '../styles/_tables.scss'

export default class Table extends Component {
  constructor (props, context) {
    super(props, context)

    this.isWidthSetted = false
    this.onBodyScroll = this.onBodyScroll.bind(this)

    // cache for handleSelect
    if (props.onSelect) {
      this.values = (props.onSelect instanceof ArrayHolder)
                    ? props.onSelect : new ArrayHolder()
      this.values.init(toArray(props.value, props.sep))
    }

    this.handleSelect = this.handleSelect.bind(this)
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
    const { header, body } = this.refs

    if (!body || !header) {
      return
    }

    let tr = body.querySelector('tr')
    if (!tr) return

    let tds = tr.querySelectorAll('td')
    if (tds.length <= 1) return

    this.isWidthSetted = true

    let bodyCgs = body.querySelectorAll('col')
    let headCgs = header.querySelectorAll('col')

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
    const { onSelect, data, sep, disableCheck } = this.props

    let value
    if (d === 'all') {
      value = data.filter(d => {
        if (disableCheck) return disableCheck(d) === false
        return true
      }).map(d => d.$value)
    } else {
      value = d.$value
    }

    this.values[checked ? 'add' : 'remove'](value)

    if (typeof onSelect === 'function') {
      onSelect(this.values.getValue(sep))
    }
    this.setState({})
  }

  renderBody (values, columns) {
    if (!columns) return

    let { data, onSelect, valueTpl, disableCheck } = this.props

    if (Array.isArray(data) && data.length === 0) {
      data = getLang('fetch.noData')
    }

    if (!Array.isArray(data)) {
      return (
        <tbody>
          <tr>
            <td style={{textAlign: 'center'}} colSpan={columns.length + (onSelect ? 1 : 0)}>{data}</td>
          </tr>
        </tbody>
      )
    }

    this.allSelected = true
    let checkedLength = 0
    let trs = data.map((d, i) => {
      let checked = false
      if (onSelect) {
        if (!d.$value) d.$value = substitute(valueTpl, d)

        let disabled = disableCheck ? disableCheck(d) : false

        if (!disabled) {
          checked = values.indexOf(d.$value) >= 0
          if (checked) checkedLength++
          this.allSelected = this.allSelected && checked
        }
      }

      return (
        <Tr key={d.id || hashcode(d)}
          columns={columns}
          data={d}
          checked={checked}
          disableCheck={disableCheck}
          onSelect={onSelect && this.handleSelect} />
      )
    })

    if (checkedLength === 0) this.allSelected = false

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
        <Header key="checkbox" className={_tables.checkbox} name="$checkbox">
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

    const { children, size, height, width, bordered, striped, filter, fetchStatus } = this.props
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
      _tables[size],
      bordered && _tables.bordered,
      height && _tables.scrolled,
      striped && _tables.striped
    )

    if (height && height !== 'auto') {
      return (
        <div style={this.props.style} className={className}>
          <Mask active={fetchStatus === FETCH_PENDING} />

          { filter }

          { columns &&
            <div className={_tables.header}>
              <div ref="headerContainer" style={headerStyle}>
                <table style={{transform: 'translateZ(0)'}} ref="header">
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
    } else {
      return (
        <div style={this.props.style} className={className}>
          <Mask active={fetchStatus === FETCH_PENDING} />

          { filter }

          <div className={_tables.body} style={bodyStyle}>
            <table style={tableStyle} ref="body">
              { children }
              { columns && this.renderColgroup(columns) }
              { columns && this.renderHeader(columns) }
              { columns && body }
            </table>
          </div>

          {this.renderPagination()}
        </div>
      )
    }
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array_element_string,
  disableCheck: PropTypes.func,
  fetchStatus: PropTypes.string,
  filter: PropTypes.element,
  headers: PropTypes.array,
  height: PropTypes.number_string,
  onSelect: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(ArrayHolder)
  ]),
  onSort: PropTypes.func,
  pagination: PropTypes.object,
  sep: PropTypes.func_string,
  size: PropTypes.string,
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
