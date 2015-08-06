'use strict'

import React from 'react'
import classnames from 'classnames'
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

  renderFilters () {
    let filters = this.state.filters.map((f, i) => {
      return (
        <FilterItem key={i} {...f} data={this.props.data} />
      )
    })
    filters.push(<FilterItem key={filters.length + 1} data={this.props.data} />)
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
        </div>
      </div>
    )
  }
}
