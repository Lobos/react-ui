import React, { Component, cloneElement } from 'react'
import curry from 'curry'
import PropTypes from './utils/proptypes'
import Form from './Form'
import FormControl from './FormControl'

import { getLang } from './lang'

export default class Filter extends Component {
  constructor (props) {
    super(props)
    this.filters = []
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter (data) {
    const { items, onFilter, innerFilter } = this.props
    onFilter && onFilter(data)
    if (innerFilter) {
      let filters = []
      items.forEach((item) => {
        if (data[item.name] && item.filter) {
          filters.push(curry(item.filter)(data[item.name]))
        }
      })
      innerFilter(filters)
    }
  }

  renderFilters () {
    const { items, columns } = this.props

    return items.map((f, i) => {
      const props = {
        label: f.label,
        grid: f.column ? f.column / columns : undefined
      }
      return (
        <FormControl key={f.name} {...props}>
          { cloneElement(f.component, {name: f.name}) }
        </FormControl>
      )
    })
  }

  render () {
    const { style, className, columns, data, buttons, labelWidth } = this.props

    return (
      <div style={style} className={className}>
        <Form data={data}
          buttons={buttons}
          columns={columns}
          labelWidth={labelWidth}
          layout="inline"
          onReset={this.handleFilter}
          onSubmit={this.handleFilter}>
          { this.renderFilters() }
        </Form>
      </div>
    )
  }
}

Filter.propTypes = {
  buttons: PropTypes.object,
  className: PropTypes.string,
  columns: PropTypes.number,
  data: PropTypes.object,
  innerFilter: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.element,
    filter: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
  })),
  labelWidth: PropTypes.number_string,
  onFilter: PropTypes.func,
  style: PropTypes.object
}

Filter.defaultProps = {
  buttons: {
    submit: getLang('buttons.filter'),
    reset: getLang('buttons.reset')
  },
  items: []
}
