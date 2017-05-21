import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { compose } from './utils/compose'
import FormItem from './higherOrders/FormItem'
import PureRender from './mixins/PureRender'

import _styles from './styles/_radio-checkbox.scss'

export class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, checked) {
    const { readOnly, onChange, checkValue, uncheckValue, index } = this.props

    if (!readOnly && onChange) {
      checked = event ? event.target.checked : checked
      const value = checked ? checkValue : uncheckValue
      onChange(value, checked, index)
    }
  }

  getCheckStatus () {
    const { value, checked, checkValue } = this.props
    if (checked !== undefined) {
      return checked
    }
    return value === checkValue
  }

  render () {
    const { style, className, block, readOnly, checkValue, isIndicator, indeterminate, text, children } = this.props
    const checked = this.getCheckStatus()

    let labelClass = classnames(
      className,
      _styles.checkbox,
      readOnly && _styles.disabled,
      block ? _styles.block : _styles.inline,
      checked && _styles.checked,
      indeterminate && _styles.indeterminate,
      isIndicator && _styles.noPadding
    )

    return (
      <label style={style} className={ labelClass }>
        <input type="checkbox"
          disabled={readOnly}
          onChange={this.handleChange}
          checked={checked}
          value={checkValue}
        />
        <span className={_styles.indicator} />
        {(text && !isIndicator) && <span>{text}</span>}
        <span>{children}</span>
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
  indeterminate: PropTypes.bool,
  index: PropTypes.number,
  isIndicator: PropTypes.bool,
  onChange: PropTypes.func,
  position: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  uncheckValue: PropTypes.any,
  value: PropTypes.any
}

Checkbox.defaultProps = {
  checkValue: true
}

function assetCheck (Component) {
  function Checked (props) {
    const { value, checkValue, ...other } = props
    let cv = checkValue !== undefined ? checkValue
      : value !== undefined ? value : true
    return <Component {...other} checkValue={cv} />
  }

  Checked.propTypes = {
    checkValue: PropTypes.any,
    value: PropTypes.any
  }

  return Checked
}

export default compose(
  assetCheck,
  FormItem.register('checkbox', {allowEmpty: true}),
  PureRender()
)(Checkbox)
