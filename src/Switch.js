import React, { Component } from 'react'
import classnames from 'classnames'
import { Checkbox } from './Checkbox'
import PropTypes from './utils/proptypes'
import FormItem from './higherOrders/FormItem'

import _styles from './styles/_radio-checkbox.scss'

class Switch extends Component {
  render () {
    const className = classnames(
      _styles.switch,
      _styles[this.props.size],
      this.props.round && _styles.round,
      (this.props.readOnly || this.props.disabled) && _styles.disabled,
      this.props.className
    )

    const text = this.props.text.split('|')

    return (
      <div className={className}>
        <Checkbox {...this.props} isIndicator block>
          <span className={_styles.on}>{text[0] || 'On'}</span>
          <span className={_styles.off}>{text[1] || 'Off'}</span>
        </Checkbox>
      </div>
    )
  }
}

Switch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  round: PropTypes.bool,
  size: PropTypes.size,
  text: PropTypes.string
}

Switch.defaultProps = {
  text: 'On|Off'
}

export default FormItem.register('switch', {}, Switch)
