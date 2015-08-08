'use strict'

import React from 'react'
import classnames from 'classnames'
import { substitute } from '../utils/strings'
import TableHeader from './tableHeader.jsx'
import styles from '../../less/tables.less'

class Table extends React.Component {
  static displayName = 'Table'

  static propTypes = {
    bordered: React.PropTypes.bool,
    children: React.PropTypes.array,
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]).isRequired,
    filters: React.PropTypes.array,
    height: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    onSort: React.PropTypes.func,
    pagination: React.PropTypes.object,
    selectAble: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    style: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  }

  componentWillMount () {
    this.fetchData(this.props.data)
    this.setHeaderProps(this.props.children)
  }

  componentDidMount () {
    this.setHeaderWidth()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.fetchData(nextProps.data)
    }
    if (nextProps.children !== this.props.children) {
      this.setHeaderProps(nextProps.children)
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth()
  }

  state = {
    index: this.props.pagination ? this.props.pagination.props.index : 1,
    data: [],
    headers: [],
    sort: {},
    total: null
  }

  setHeaderWidth () {
    let body = React.findDOMNode(this.refs.body)
    let tr = body.querySelector('tr')
    if (!tr) {
      return
    }

    let ths = React.findDOMNode(this.refs.header).querySelectorAll('th')

    let tds = tr.querySelectorAll('td')
    for (let i = 0, count = tds.length; i < count; i++) {
      if (ths[i]) {
        ths[i].style.width = tds[i].offsetWidth + 'px'
      }
    }
  }

  setHeaderProps (children) {
    let headers = []
    if (children) {
      if (children.constructor === Array) {
        children.forEach(child => {
          if (child.type === TableHeader) {
            headers.push(child)
          }
        })
      } else if (children.type === TableHeader) {
        headers.push(children)
      }
    }
    this.setState({headers})
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data.then(res => {
        this.fetchData(res)
      })()
    } else {
      this.setState({ data })
    }
  }

  sortData (key, asc) {
    let data = this.state.data
    data = data.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        if (asc) {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        } else {
          return ((x > y) ? -1 : ((x < y) ? 1 : 0))
        }
    })
    this.setState({ data })
  }

  onCheck (i, e) {
    let checked = typeof e === 'boolean' ? e : e.target.checked,
        data = this.state.data,
        index = this.state.index,
        size = this.props.pagination ? this.props.pagination.props.size : data.length,
        start = 0,
        end = 0
    if (i === 'all') {
      start = (index - 1) * size
      end = index * size
    } else {
      start = (index - 1) * size + i
      end = start + 1
    }
    for (; start < end; start++) {
      data[start].$checked = checked
    }
    this.setState({data})
  }

  getChecked (name) {
    let values = []
    this.state.data.forEach(d => {
      if (d.$checked) {
        values.push(name ? d[name] : d)
      }
    })
    return values
  }

  onBodyScroll (e) {
    let hc = React.findDOMNode(this.refs.headerContainer)
    hc.style.marginLeft = (0 - e.target.scrollLeft) + 'px'
  }

  getData () {
    let page = this.props.pagination,
        filters = this.props.filters,
        data = []

    if (filters) {
      let filterCount = filters.length
      this.state.data.forEach(d => {
        let checked = true
        for (let i = 0; i < filterCount; i++) {
          let f = filters[i].func
          checked = f(d)
          if (!checked) {
            break
          }
        }
        if (checked) {
          data.push(d)
        }
      })
    } else {
      data = this.state.data
    }

    let total = data.length

    if (!page) {
      return { total, data }
    }
    let size = page.props.size
    if (data.length <= size) {
      return { total, data }
    }
    let index = this.state.index
    data = data.slice((index - 1) * size, index * size)
    return { total, data }
  }

  renderBody (data) {
    let selectAble = this.props.selectAble
    let trs = data.map((d, i) => {
      let tds = []
      if (selectAble) {
        tds.push(
          <td style={{width: 13}} key="checkbox">
            <input checked={d.$checked} onChange={this.onCheck.bind(this, i)} type="checkbox" />
          </td>
        )
      }
      this.state.headers.map((h, j) => {
        if (h.props.hidden) {
          return
        }
        let content = h.props.content,
            tdStyle = {}
        if (typeof content === 'string') {
          content = substitute(content, d)
        } else if (typeof content === 'function') {
          content = content(d)
        } else {
          content = d[h.props.name]
        }
        if (h.props.width) {
          tdStyle.width = h.props.width
        }
        tds.push(<td style={tdStyle} key={j}>{content}</td>)
      })
      return <tr key={i}>{tds}</tr>
    })

    return <tbody>{trs}</tbody>
  }

  renderHeader () {
    let headers = []
    if (this.props.selectAble) {
      headers.push(
        <TableHeader key="checkbox" name="$checkbox">
          <input onClick={this.onCheck.bind(this, 'all')} type="checkbox" />
        </TableHeader>
      )
    }
    this.state.headers.map((header, i) => {
      if (header.type === TableHeader && !header.props.hidden) {
        let props = {
          key: i,
          onSort: (name, asc) => {
            this.setState({sort: { name, asc }})
            if (this.props.onSort) {
              this.props.onSort(name, asc)
            } else {
              this.sortData(name, asc)
            }
          },
          sort: this.state.sort
        }

        headers.push(React.addons.cloneWithProps(header, props))
      }
    })
    return <tr>{headers}</tr>
  }

  renderPagination (total) {
    if (!this.props.pagination) {
      return null
    }

    let props = {
      total: total,
      onChange: (index) => {
        let data = this.state.data
        data.forEach(d => {
          d.$checked = false
        })
        this.setState({index, data})
      }
    }
    return React.addons.cloneWithProps(this.props.pagination, props)
  }

  render () {
    let bodyStyle = {},
        headerStyle = {},
        tableStyle = {},
        onBodyScroll = null,
        { total, data } = this.getData()


    if (this.props.height) {
      bodyStyle.height = this.props.height
      bodyStyle.overflow = 'auto'
    }
    if (this.props.width) {
      headerStyle.width = this.props.width
      if (typeof headerStyle.width === 'number') {
        headerStyle.width += 20
      }
      tableStyle.width = this.props.width
      bodyStyle.overflow = 'auto'
      onBodyScroll = this.onBodyScroll.bind(this)
    }

    let className = classnames(
      this.props.className,
      styles.table,
      {
        'bordered': this.props.bordered,
        'scrolled': this.props.height,
        'striped': this.props.striped
      }
    )

    return (
      <div style={this.props.style} className={className}>
        <div className={styles.headerContainer}>
          <div ref="headerContainer" style={headerStyle}>
            <table ref="header">
              <thead>{this.renderHeader()}</thead>
            </table>
          </div>
        </div>

        <div onScroll={onBodyScroll} style={bodyStyle} className={styles.bodyContainer}>
          <table style={tableStyle} className={styles.tableBody} ref="body">
            {this.renderBody(data)}
          </table>
        </div>

        {this.renderPagination(total)}

      </div>
    )
  }
}

export default Table
