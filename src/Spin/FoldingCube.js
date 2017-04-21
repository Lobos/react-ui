import React from 'react'
import classnames from 'classnames'
import propTypes from './proptypes'

import _styles from '../styles/spin/_folding-cube.scss'

export default function FoldingCube (props) {
  const { size, color, margin } = props

  const className = classnames(
    props.className,
    _styles['folding-cube']
  )

  const style = {
    width: size,
    height: size,
    margin
  }

  return (
    <div style={style} className={className}>
    {
      [1, 2, 3, 4].map(i => (
        <div key={i} className={classnames(_styles.cube, _styles['cube' + i])}>
          <span style={{backgroundColor: color}} />
        </div>
      ))
    }
    </div>
  )
}

FoldingCube.propTypes = propTypes

