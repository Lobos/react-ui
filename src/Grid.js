import React, { Children, cloneElement } from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'
import { getGrid } from './utils/grids'

export default function Grid (props) {
  let { className, width = 1, offset, responsive, style, stretch, children, ...other } = props

  let autoCount = 0
  let settleWidth = 0
  Children.toArray(children).forEach(child => {
    if (child.type && child.type.isGrid) {
      if (child.props.width) settleWidth += child.props.width
      else autoCount++
    }
  })

  let autoWidth = autoCount > 0 ? (1 - settleWidth) / autoCount : 0

  className = classnames(
    className,
    getGrid({ width, offset, responsive })
  )
  return (
    <div style={style} className={className} {...other}>
    {
      Children.toArray(children).map(child => {
        if (child.type && child.type.isGrid) {
          if (child.props.width && !stretch) return child

          let pps = {}
          if (!child.props.width) pps.width = autoWidth
          if (stretch) pps.style = { ...child.props.style, minHeight: '100%', height: '100%' }

          return cloneElement(child, pps)
        } else {
          return child
        }
      })
    }
    </div>
  )
};

Grid.isGrid = true

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  offset: PropTypes.number,
  responsive: PropTypes.string,
  stretch: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.number
}
