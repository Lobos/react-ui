import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { objectAssign } from './utils/objects'
import Button from './Button'

import FormStyles from './styles/_form.scss'

export default function FormSubmit (props) {
  console.warn('FormSubmit is deprecated, use Form.buttons instead.')

  let children = props.children
  let content
  if (Array.isArray(children)) {
    content = props.disabled ? children[1] : children[0]
  } else {
    content = children
  }

  let { labelWidth, style, layout } = props

  if (labelWidth) {
    if (typeof labelWidth === 'number' && labelWidth < 1) {
      labelWidth += '%'
    }
  }

  if (layout === 'aligned') {
    labelWidth = labelWidth || '10rem'
    style = objectAssign({}, style, { paddingLeft: labelWidth })
  }

  return (
    <div style={style} className={classnames(FormStyles.group, FormStyles.control)}>
      <Button type="submit"
        status="primary"
        onClick={props.onClick}
        disabled={props.disabled}>
        {content}
      </Button>
    </div>
  )
}

FormSubmit.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  layout: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}
