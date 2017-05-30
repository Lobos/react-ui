import React, { Component } from 'react'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import FormItem from './higherOrders/FormItem'
import Trigger from './higherOrders/Trigger'
import PropTypes from './utils/proptypes'
import { compose } from './utils/compose'
import { format } from './utils/strings'
import { getLang } from './lang'

import _inputs from './styles/_input.scss'

class Json extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleBlur (event) {
    let value = event.target.value
    const { valueType, onChange } = this.props

    try {
      if (value) {
        value = JSON.parse(value)
        if (valueType === 'string') value = JSON.stringify(value, null, 4)
      }
      onChange(value)
    } catch (e) {
      onChange(new Error(format(getLang('validation.tips.json'), '')))
    }
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    let { value } = this.state
    let { className, grid, readOnly, style, rows } = this.props

    const props = {
      className: classnames(
        className,
        getGrid(grid),
        readOnly && _inputs.disabled,
        _inputs.input
      ),
      onBlur: readOnly ? undefined : this.handleBlur,
      onChange: readOnly ? undefined : this.handleChange,
      readOnly,
      style,
      rows
    }

    if (typeof value === 'object') value = JSON.stringify(value, null, 4)

    return (
      <textarea {...props} value={value} />
    )
  }
}

Json.propTypes = {
  className: PropTypes.string,
  grid: PropTypes.grid,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.any,
  valueType: PropTypes.oneOf(['string', 'object'])
}

Json.defaultProps = {
  style: {},
  grid: 1,
  rows: 10,
  value: '',
  valueType: 'string'
}

export default compose(
  FormItem.register(['json'], {}),
  Trigger
)(Json)
