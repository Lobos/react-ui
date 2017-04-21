import React from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'

import Styles from './styles/_overlay.scss'

export default function Overlay (props) {
  let className = classnames(
    props.className,
    Styles.overlay
  )

  return (
    <div {...props} className={className} />
  )
}

Overlay.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}

