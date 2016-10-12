import { createElement } from 'react'
import { safeHtml } from './utils/safeHtml'
import PropTypes from './utils/proptypes'

export default function SafeHtml (props) {
  const { tag, children } = props

  let pps = typeof children === 'string'
    ? { dangerouslySetInnerHTML: { __html: safeHtml(children) } }
    : { children }

  return createElement(tag, pps)
}

SafeHtml.propTypes = {
  children: PropTypes.any,
  tag: PropTypes.string
}

SafeHtml.defaultProps = {
  tag: 'span'
}
