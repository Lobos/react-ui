import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_three-bounce.scss'

export default function ThreeBounce (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['three-bounce']
  )

  let ss = /^(\d+)([%|\w]*)$/.exec(size)
  ss[2] = ss[2] || 'px'
  let width = ss[1] / 2 + ss[2]

  const style = {
    width: ss[1] * 2 + ss[2],
    margin
  }

  const childStyle = {
    backgroundColor: color,
    width,
    height: width
  }

  return (
    <div style={style} className={className}>
      <div style={childStyle} className={classnames(_styles.child, _styles.bounce1)} />
      <div style={childStyle} className={classnames(_styles.child, _styles.bounce2)} />
      <div style={childStyle} className={classnames(_styles.child)} />
    </div>
  )
}

ThreeBounce.propTypes = propTypes
