import { substitute } from './utils/strings'
import PropTypes from './utils/proptypes'

import _styles from './styles/_form.scss'

export default function FormText (props, context) {
  const { textTpl } = props
  const { formData } = context

  return (
    <div className={_styles.text}>{substitute(textTpl, formData)}</div>
  )
}

FormText.propTypes = {
  textTpl: PropTypes.string
}

FormText.contextTypes = {
  formData: PropTypes.object
}
