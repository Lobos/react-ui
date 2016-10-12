import { Children, createElement, DOM } from 'react'
import PropTypes from './utils/proptypes'

function If (props, context) {
  const { children, predicate, tag } = props

  const suc = predicate(context.formData)

  if (!suc) {
    return DOM.noscript()
  }

  if (Array.isArray(children)) {
    return createElement(tag, {}, children)
  } else {
    return Children.only(children)
  }
}

If.propTypes = {
  children: PropTypes.any,
  predicate: PropTypes.func,
  tag: PropTypes.string
}

If.contextTypes = {
  formData: PropTypes.object
}

If.defaultProps = {
  tag: 'div'
}

export default If
