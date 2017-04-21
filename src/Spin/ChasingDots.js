import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_chasing-dots.scss'

export default function ChasingDots (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['chasing-dots']
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
      <div style={{backgroundColor: color}} className={_styles.child} />
      <div style={{backgroundColor: color}} className={classnames(_styles.child, _styles.dot2)} />
    </div>
  )
}

ChasingDots.propTypes = propTypes
