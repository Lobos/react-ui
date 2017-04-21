import React from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'

import _styles from './styles/_tags.scss'

export default function Tag (props) {
  const { pill, type, children, ...other } = props
  const className = classnames(
    _styles.tag,
    pill && _styles['tag-pill'],
    type && _styles[`tag-${type}`]
  )

  return <span {...other} className={className}>{children}</span>
}

Tag.propTypes = {
  children: PropTypes.any,
  pill: PropTypes.bool,
  type: PropTypes.string
}

Tag.defaultProps = {
  type: 'default'
}
