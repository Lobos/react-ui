import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_cube-grid.scss'

export default function CubeGrid (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['cube-grid']
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
    {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <div key={i} style={{backgroundColor: color}}
          className={classnames(_styles.cube, _styles['cube' + i])} />
      ))
    }
    </div>
  )
}

CubeGrid.propTypes = propTypes
