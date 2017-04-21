import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_wave.scss'

export default function Wave (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles.wave
  )

  let ss = /^(\d+)([%|\w]*)$/.exec(size)
  ss[2] = ss[2] || 'px'

  const style = {
    width: ss[1] + ss[2],
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
    {
      [1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{backgroundColor: color, width: ss[1] / 7 + ss[2]}}
          className={classnames(_styles.rect, _styles['rect' + i])} />
      ))
    }
    </div>
  )
}

Wave.propTypes = propTypes
