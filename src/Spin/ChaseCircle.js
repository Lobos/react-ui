import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_chase-circle.scss'

export default function ChaseCircle (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['chase-circle']
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  let ss = /^(\d+)([%|\w]*)$/.exec(size)
  ss[2] = ss[2] || 'px'
  ss[1] = ss[1] / 10

  const border = {
    borderTop: `solid ${ss[1]}${ss[2]} ${color}`,
    borderLeft: `solid ${ss[1]}${ss[2]} ${color}`
  }

  return (
    <div style={style} className={className}>
      {
        [1, 2, 3, 4].map(i => (
          <div key={i} className={_styles.item} style={border} />
        ))
      }
    </div>
  )
}

ChaseCircle.propTypes = propTypes
