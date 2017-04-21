import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_pulse.scss'

export default function Pulse (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['spinner-pulse']
  )

  const style = {
    width: size,
    height: size,
    backgroundColor: color,
    margin
  }

  return (
    <div style={style} className={className} />
  )
}

Pulse.propTypes = propTypes

