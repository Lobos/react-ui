import React, {Children, cloneElement } from 'react'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import Button from './Button'
import PropTypes from './utils/proptypes'

import _styles from './styles/_input.scss'

export default function InputGroup (props) {
  const { size, grid, style } = props
  let className = classnames(
    props.className,
    _styles.group,
    getGrid(grid)
  )

  const children = Children.map(props.children, (child) => {
    let type = child ? child.type : null

    if (type && type.isFormItem) {
      return cloneElement(child, {
        size
      })
    } else if (type === Button) {
      return cloneElement(child, {
        tag: 'a',
        size,
        href: child.props.href || 'javascript:;',
        className: classnames(_styles.btn)
      })
    } else {
      return <div className={classnames(_styles.addon, _styles[size])}>{child}</div>
    }
  })

  return <div className={className} style={style}>{children}</div>
}

InputGroup.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  grid: PropTypes.grid,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  style: PropTypes.object
}

InputGroup.defaultProps = {
  size: 'middle'
}
