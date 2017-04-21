import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_plane.scss'

export default function Plane (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles.plane
  )

  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    margin
  }
  return <div className={className} style={style} />
}

Plane.propTypes = propTypes
