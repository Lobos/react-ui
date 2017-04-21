import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_simple-circle.scss'

export default function SimpleCircle (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['simple-circle']
  )

  let ss = /^(\d+)([%|\w]*)$/.exec(size)
  ss[2] = ss[2] || 'px'

  const style = {
    width: size,
    height: size,
    borderWidth: (ss[1] / 10) + ss[2],
    borderTopColor: color,
    margin
  }

  return (
    <div style={style} className={className} />
  )
}

SimpleCircle.propTypes = propTypes
