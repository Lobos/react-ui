import React, { Component, Children, cloneElement } from 'react'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import Button from './Button'
import PropTypes from './utils/proptypes'

import _styles from './styles/_input.scss'

export default class InputGroup extends Component {
  render () {
    const { size, grid } = this.props
    let className = classnames(
      _styles.group,
      getGrid(grid)
    )

    const children = Children.map(this.props.children, (child) => {
      let type = child ? child.type : null

      if (type && type.isFormItem) {
        return cloneElement(child, {
          size
        })
      } else if (type === Button) {
        return cloneElement(child, {
          tag: 'a',
          size,
          className: classnames(this.props.className, _styles.btn)
        })
      } else {
        return <div className={classnames(_styles.addon, _styles[size])}>{child}</div>
      }
    })

    return <div className={className}>{children}</div>
  }
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
