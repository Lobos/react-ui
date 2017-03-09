import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import Datepicker from './Datetime'
import PureRender from '../mixins/PureRender'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'
import { format } from '../utils/strings'

import { getLang } from '../lang'

import _datepickers from '../styles/_datepicker.scss'

class Range extends Component {
  constructor (props) {
    super(props)
    this.firstChange = this.firstChange.bind(this)
    this.secondChange = this.secondChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange (val, index) {
    let values = [...this.props.value]
    values[index] = val
    this.props.onChange(values)
  }

  firstChange (value) {
    this.handleChange(value, 0)
  }

  secondChange (value) {
    this.handleChange(value, 1)
  }

  handleClear () {
    this.props.onChange([])
  }

  render () {
    const { className, value, min, max, con, hasError, ...other } = this.props

    const type = other.type.replace('-range', '')

    return (
      <div className={classnames(_datepickers.range, className, hasError && _datepickers.danger)}>
        <Datepicker min={min} {...other}
          max={value[1]}
          value={value[0]}
          type={type}
          onChange={this.firstChange}
        />
        {con}
        <Datepicker max={max} {...other}
          min={value[0]}
          value={value[1]}
          onClear={this.handleClear}
          type={type}
          onChange={this.secondChange}
        />
      </div>
    )
  }
}

Range.isFormItem = true

Range.propTypes = {
  className: PropTypes.string,
  con: PropTypes.any,
  hasError: PropTypes.bool,
  max: PropTypes.datetime,
  min: PropTypes.datetime,
  names: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.array
}

Range.defaultProps = {
  con: '-',
  names: [],
  type: 'datetime',
  value: []
}

function validate (value = [], args) {
  if (!args.required) return true
  let result = (value[0] && value[1]) ? true
    : new Error(format(getLang('validation.tips.required'), args.label || ''))
  return result
}

export default compose(
  FormItem.register(['datetime-range', 'date-range', 'time-range'], { valueType: 'datetime', validate }),
  PureRender()
)(Range)
