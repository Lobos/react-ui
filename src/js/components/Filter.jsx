'use strict'

import React from 'react'
import classnames from 'classnames'
import { forEach } from '../utils/objects'
import Button from './Button.jsx'
import FilterItem from './FilterItem.jsx'
import clickAway from '../higherorder/clickaway'
import filterStyles from '../../less/filter.less'
import formControlStyles from '../../less/form-control.less'
import {getLang} from '../lang'

/*
data = [{
  label: '',
  name: '',
  op: ['startWidth', ''],
  startWidth: function (d) {
  }
}]
*/

@clickAway
export default class Filter extends React.Component {
  static displayName = 'Filter'

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.array,
    onFilter: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    type: React.PropTypes.string
  }

  static defaultProps = {
    data: []
  }

  componentClickAway () {
    this.close()
  }

  state = {
    active: false,
    filters: []
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
    }, 400)
  }

  getFilter () {
    let filters = []
    forEach(this.refs, (ref) => {
      if (ref.getFilter) {
        filters.push(ref.getFilter())
      }
    })
    return filters
  }

  addFilter () {
    let filters = this.getFilter()
    filters.push({})
    this.setState({ filters })
  }

  removeFilter (index) {
    let filters = this.state.filters
    filters.splice(index, 1)
    this.setState({ filters })
  }

  clearFilter () {
    this.setState({ filters: [] })
  }

  onFilter () {
    this.close()
    if (this.props.onFilter) {
      let filters = this.getFilter(),
          novs = []
      this.setState({ filters })
      filters.forEach(f => {
        if (f.op && f.value) {
          novs.push({
            name: f.name,
            op: f.op,
            value: f.value
          })
        }
      })
      this.props.onFilter(novs)
    }
  }

  renderFilters () {
    let filters = this.state.filters.map((f, i) => {
      return (
        <FilterItem removeFilter={this.removeFilter.bind(this)} ref={`fi${i}`} index={i} key={i} {...f} data={this.props.data} />
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
      <div className={className}>
        <div onClick={this.open.bind(this)} className={filterStyles.result}>
          <i className="search" />
        </div>
        <div className={filterStyles.optionsWrap}>
          <div ref="options" className={filterStyles.options}>
            {this.renderFilters()}
            <div>
              <Button status="success" onClick={this.addFilter.bind(this)}>+</Button>
              <Button style={{marginLeft: 10}} onClick={this.clearFilter.bind(this)}>{getLang('buttons.clear')}</Button>
              <Button style={{marginLeft: 10}} status="primary" onClick={this.onFilter.bind(this)}>{getLang('buttons.filter')}</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
