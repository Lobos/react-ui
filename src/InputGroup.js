'use strict'

import React, { Children, cloneElement } from 'react'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import Input from './Input'
import Button from './Button'
import PropTypes from './utils/proptypes'

import InputStyles from './styles/_input-group.scss'

export default function InputGroup (props) {
  const { size, grid } = props
  let className = classnames(
    InputStyles.group,
    InputStyles[size],
    getGrid(grid)
  )

  const children = Children.map(props.children, (child) => {
    let type = child ? child.type : null

    if (type === Input) {
      return cloneElement(child, {
        size,
        className: classnames(props.className, InputStyles.input)
      })
    } else if (type === Button) {
      return cloneElement(child, {
        tag: 'a',
        size,
        className: classnames(props.className, InputStyles.btn)
      })
    } else {
      return <div className={classnames(InputStyles.addon, InputStyles[size])}>{child}</div>
    }
  })

  return <div className={className}>{children}</div>
}

InputGroup.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  grid: PropTypes.grid,
  size: PropTypes.oneOf(['large', 'middle', 'small'])
}

InputGroup.defaultProps = {
  size: 'middle'
}
