import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { Checkbox } from './Checkbox'
import Fetch from './higherOrders/Fetch'
import FormItem from './higherOrders/FormItem'
import TextValue from './higherOrders/TextValue'
import { compose } from './utils/compose'

import Styles from './styles/_radio-checkbox.scss'

const CheckboxGroup = (props) => {
  const { className, style, data, readOnly, block, inline, onChange } = props

  // old inline prop
  let checkBlock = block
  if (block === undefined && inline !== undefined) {
    checkBlock = !inline
  }

  return (
    <div style={style} className={classnames(className, Styles.group)}>
    {
      data.map((item, i) => {
        return (
          <Checkbox key={item.$key}
            index={i}
            className={item.className}
            readOnly={readOnly}
            block={checkBlock}
            checked={item.$checked}
            onChange={onChange}
            text={item.$text}
            checkValue={item.$value}
          />
        )
      })
    }
    </div>
  )
}

CheckboxGroup.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object
}

CheckboxGroup.defaultProps = {
  data: []
}

export default compose(
  FormItem.register('checkbox-group', {valueType: 'array'}),
  Fetch(false),
  TextValue(false)
)(CheckboxGroup)
