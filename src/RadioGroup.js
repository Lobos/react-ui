import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import Fetch from './higherOrders/Fetch'
import FormItem from './higherOrders/FormItem'
import Radio from './Radio'
import { compose } from './utils/compose'
import TextValue from './higherOrders/TextValue'

import Styles from './styles/_radio-checkbox.scss'

const RadioGroup = (props) => {
  let { className, data, inline, block, onChange, style, readOnly } = props

  // old inline prop
  if (block === undefined && inline !== undefined) {
    block = !inline
  }

  const items = data.map(function (item, i) {
    return (
      <Radio key={item.$key}
        block={block}
        index={i}
        onClick={onChange}
        readOnly={readOnly}
        checked={item.$checked}
        text={item.$text}
        checkValue={item.$value}
      />
    )
  }, this)

  return (
    <div style={style} className={classnames(className, Styles.group)}>{items}</div>
  )
}

RadioGroup.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object
}

export default compose(
  FormItem.register('radio-group', {}),
  Fetch(false),
  TextValue(true)
)(RadioGroup)
