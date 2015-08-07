'use strict'

import React from 'react'
import classnames from 'classnames'
import { forEach } from '../utils/objects'
import Button from './Button.jsx'
import FilterItem from './FilterItem.jsx'
import filterStyles from '../../less/filter.less'
import formControlStyles from '../../less/form-control.less'

/*
data = [{
  label: '',
  name: '',
  op: ['startWidth', ''],
  startWidth: function (d) {
  }
}]
*/

export default class Filter extends React.Component {
  static displayName = 'Filter'

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.array,
    onSearch: React.PropTypes.func,
    type: React.PropTypes.string
  }

  static defaultProps = {
    data: []
  }

  state = {
    filters: []
  }

  onSearch () {
    if (this.props.onSearch) {
      this.props.onSearch()
    }
  }

  onChange (index, filter) {
    let filters = this.state.filters
    filters[index] = filter
    this.setState({ filters })
    console.log(filters)
  }

  getFilter () {
    let filters = []
    forEach(this.refs, (ref) => {
      filters.push(ref.getFilter())
    })
    return filters
  }

  addFilter () {
    let filters = this.getFilter()
    filters.push({})
    this.setState({ filters })
  }

  renderFilters () {
    let filters = this.state.filters.map((f, i) => {
      return (
        <FilterItem onChange={this.onChange.bind(this)} ref={`fi${i}`} index={i} key={i} {...f} data={this.props.data} />
      )
    })
    return filters
  }

  render () {
    let className = classnames(
      this.props.className,
      filterStyles.filter,
      formControlStyles.control
    )
    return (
      <div className={className}>
        <div className="result"></div>
        <div className="options">
          {this.renderFilters()}
          <div>
            <Button onClick={this.addFilter.bind(this)}>+</Button>
          </div>
        </div>
      </div>
    )
  }
}
