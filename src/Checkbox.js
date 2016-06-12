'use strict'

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { compose } from './utils/compose'
import FormItem from './higherOrders/FormItem'
import PureRender from './mixins/PureRender'

import Styles from './styles/_radio-checkbox.scss'

export class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, checked) {
    const { readOnly, onChange, index } = this.props

    if (readOnly) {
      return
    }

    const defaultValue = this.getDefaultValue()

    if (onChange) {
      checked = event ? event.target.checked : checked
      const value = checked ? defaultValue : undefined
      onChange(value, checked, index)
    }
  }

  getDefaultValue () {
    let { defaultValue, checkValue } = this.props

    if (checkValue !== undefined) {
      defaultValue = checkValue
      console.warn('checkValue is deprecated, use defaultValue instead.')
    }

    return defaultValue
  }

  getCheckStatus () {
    const { value, checked } = this.props
    if (checked !== undefined) {
      return checked
    }
    return value === this.getDefaultValue()
  }

  render () {
    const { style, className, block, readOnly, defaultValue, isIndicator, indeterminate, text, children } = this.props
    const checked = this.getCheckStatus()

    let labelClass = classnames(
      className,
      Styles.checkbox,
      readOnly && Styles.disabled,
      block ? Styles.block : Styles.inline,
      checked && Styles.checked,
      indeterminate && Styles.indeterminate,
      isIndicator && Styles.noPadding
    )

    return (
      <label style={style} className={ labelClass }>
        <input type="checkbox"
          disabled={readOnly}
          indeterminate={indeterminate}
          onChange={this.handleChange}
          checked={checked}
          value={defaultValue}
        />
        <span className={Styles.indicator}></span>
        {(text && !isIndicator) && <span>{text}</span>}
        {children}
      </label>
    )
  }
}

Checkbox.propTypes = {
  block: PropTypes.bool,
  checkValue: PropTypes.any,
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  defaultValue: PropTypes.any.isRequired,
  indeterminate: PropTypes.bool,
  index: PropTypes.number,
  isIndicator: PropTypes.bool,
  onChange: PropTypes.func,
  position: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
}

Checkbox.defaultProps = {
  defaultValue: true
}

export default compose(
  FormItem.register('checkbox', {}),
  PureRender()
)(Checkbox)
