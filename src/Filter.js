'use strict'

import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import Form from './Form'
import FormControl from './FormControl'

import { getLang, setLang } from './lang'
setLang('buttons')

import _filters from './styles/_filter.scss'

export default class Filter extends Component {
  constructor (props) {
    super(props)
    this.filters = []
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter (data) {
    if (this.props.onFilter) {
      this.props.onFilter(data)
    }
  }

  renderFilters () {
    const { items } = this.props

    return items.map((f, i) => {
      return (
        <FormControl key={f.component.props.name} grid={f.grid} label={f.label}>
          { f.component }
        </FormControl>
      )
    })
  }

  render () {
    const { style, columns, data, buttons, labelWidth } = this.props

    let className = classnames(
      this.props.className,
      _filters.container
    )
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
  items: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.element,
    filter: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string
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
