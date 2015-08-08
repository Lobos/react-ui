'use strict'

import React from 'react'
import classnames from 'classnames'
//import { forEach } from '../utils/objects'
import Button from './Button.jsx'
import FilterItem from './FilterItem.jsx'
import clickAway from '../higherorder/clickaway'
import filterStyles from '../../less/filter.less'
import formControlStyles from '../../less/form-control.less'
import {getLang} from '../lang'

@clickAway
export default class Filter extends React.Component {
  static displayName = 'Filter'

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.array,
    local: React.PropTypes.bool,
    onFilter: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    style: React.PropTypes.object,
    type: React.PropTypes.string
  }

  static defaultProps = {
    data: []
  }

  componentWillMount () {
    this.initData(this.props.data)
  }

  componentClickAway () {
    this.close()
  }

  state = {
    active: false,
    filters: []
  }

  initData (data) {
    data = data.map((d, i) => {
      d.dataIndex = i
      return d
    })
    this.setState({ data })
  }

  onSearch () {
    if (this.props.onSearch) {
      this.props.onSearch()
    }
  }

  open () {
    this.bindClickAway()
    let options = React.findDOMNode(this.refs.options)
    options.style.display = 'block'
    setTimeout(() => {
      this.setState({ active: true })
    }, 0)
    setTimeout(() => {
      options.parentNode.style.overflow = 'visible'
    }, 450)
  }

  close () {
    let options = React.findDOMNode(this.refs.options)
    options.parentNode.style.overflow = 'hidden'
    this.setState({ active: false })
    this.unbindClickAway()
    setTimeout(() => {
      options.style.display = 'none'
    }, 450)
  }

  addFilter () {
    let filters = this.state.filters
    filters.push({})
    this.setState({ filters })
  }

  removeFilter (index) {
    let filters = this.state.filters
    filters.splice(index, 1)
    this.setState({ filters })
  }

  clearFilter () {
    this.setState({ filters: [], resultText: '' })
    this.close()
    if (this.props.onFilter) {
      this.props.onFilter([])
    }
  }

  onChange (index, filter) {
    let filters = this.state.filters,
        f = filters[index]
    Object.keys(filter).forEach(k => {
      f[k] = filter[k]
    })
    this.setState({ filters })
  }

  onFilter () {
    this.close()
    let filters = this.state.filters,
        local = this.props.local
    this.setState({ resultText: this.formatText(filters) })
    if (this.props.onFilter) {
      let novs = []
      filters.forEach((f, i) => {
        if (f.op && f.value) {
          let nov = { name: f.name, op: f.op, value: f.value }
          if (local) {
            nov.func = this.refs[`fi${i}`].getFunc()
          }
          novs.push(nov)
        }
      })
      this.props.onFilter(novs)
    }
  }

  formatText (filters) {
    let text = []
    filters.forEach(f => {
      text.push(`${f.label} ${f.op} '${f.value}'`)
    })
    return text.join(', ')
  }

  renderFilters () {
    let filters = this.state.filters.map((f, i) => {
      return (
        <FilterItem onChange={this.onChange.bind(this)} removeFilter={this.removeFilter.bind(this)} ref={`fi${i}`} index={i} key={i} {...f} data={this.state.data} />
      )
    })
    return filters
  }

  render () {
    let className = classnames(
      this.props.className,
      filterStyles.filter,
      formControlStyles.control,
      this.state.active ? filterStyles.active : ''
    )
    return (
      <div style={this.props.style} className={className}>
        <div onClick={this.open.bind(this)} className={filterStyles.result}>
          {this.state.resultText}
          <i className="search" />
        </div>

        <div className={filterStyles.optionsWrap}>
          <div ref="options" className={filterStyles.options}>

            {this.renderFilters()}

            <div>
              <Button status="success" onClick={this.addFilter.bind(this)}>+</Button>
              <Button style={{marginLeft: 10}} onClick={this.clearFilter.bind(this)}>{getLang('buttons.clear')}</Button>
              <Button style={{marginLeft: 10}} status="primary" onClick={this.onFilter.bind(this)}>{getLang('buttons.ok')}</Button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
