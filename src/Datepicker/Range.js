'use strict'

import React from 'react'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import Datepicker from './Datetime'
import PureRender from '../mixins/PureRender'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'

import _datepickers from '../styles/_datepicker.scss'

class Range extends React.Component {
  constructor (props) {
    super(props)
    this.firstChange = this.firstChange.bind(this)
    this.secondChange = this.secondChange.bind(this)
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

  render () {
    const { className, value, min, max, con, ...other } = this.props
    return (
      <div className={classnames(className, _datepickers.range)}>
        <Datepicker min={min} {...other}
          max={value[1]}
          value={value[0]}
          onChange={this.firstChange}
        />
        {con}
        <Datepicker max={max} {...other}
          min={value[0]}
          value={value[1]}
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
  max: PropTypes.datetime,
  min: PropTypes.datetime,
  names: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.array
}

Range.defaultProps = {
  con: '-',
  names: [],
  value: []
}

function validate (value) {
}

export default compose(
  FormItem.register('datetime-range', { valueType: 'array', validate }),
  PureRender()
)(Range)
