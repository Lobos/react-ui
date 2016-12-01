import { isValidElement } from 'react'
import PropTypes from './utils/proptypes'

import _styles from './styles/_form.scss'

export default function FormText (props, context) {
  const { children } = props
  const { formData } = context

  let item = children(formData)
  if (!isValidElement(item)) {
    item = <div className={_styles.text}>{item}</div>
  }

  return item
}

FormText.propTypes = {
  children: PropTypes.func
}

FormText.contextTypes = {
  formData: PropTypes.object
}
