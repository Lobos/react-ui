'use strict'

import { Component, cloneElement, PropTypes } from 'react'
import Enhance from './higherOrders/FormItem'

class FormItem extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    if (value && value.nativeEvent) {
      value = value.target.value
    }

    this.props.onChange(value)
  }

  render () {
    const { value = '' } = this.props
    return cloneElement(this.props.children, {
      value,
      onChange: this.handleChange
    })
  }
}

FormItem.propTypes = {
  children: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any
}

export default Enhance(FormItem)
