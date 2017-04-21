import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_circle.scss'

export default function Circle (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles.circle
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
    {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
        <div key={i} className={classnames(_styles.child, _styles['circle' + i])}>
          <div style={{backgroundColor: color}} />
        </div>
      ))
    }
    </div>
  )
}

Circle.propTypes = propTypes
