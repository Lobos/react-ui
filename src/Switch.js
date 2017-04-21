import React from 'react'
import classnames from 'classnames'
import { Checkbox } from './Checkbox'
import PropTypes from './utils/proptypes'
import FormItem from './higherOrders/FormItem'

import _styles from './styles/_radio-checkbox.scss'

function Switch (props) {
  const className = classnames(
    _styles.switch,
    _styles[props.size],
    props.round && _styles.round,
    (props.readOnly || props.disabled) && _styles.disabled,
    props.className
  )

  const text = props.text.split('|')

  return (
    <div className={className}>
      <Checkbox {...props} isIndicator block>
        <span className={_styles.on}>{text[0] || 'On'}</span>
        <span className={_styles.off}>{text[1] || 'Off'}</span>
      </Checkbox>
    </div>
  )
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
