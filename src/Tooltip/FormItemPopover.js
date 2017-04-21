import React from 'react'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import _styles from '../styles/_popover.scss'

export default function FormItemPopover (props) {
  const { children, content, position, style, type } = props

  let className = classnames(
    _styles.popover,
    _styles[`popover-${position}`],
    _styles[`popover-${type}`]
  )

  let popStyle = {}
  switch (position) {
    case 'top-left':
      popStyle = { left: 0 }
      break
    case 'top':
      popStyle = { left: '50%' }
      break
    case 'top-right':
      popStyle = { left: '100%' }
      break
    case 'left':
      popStyle = { left: 0, top: '50%' }
      break
    case 'right':
      popStyle = { left: '100%', top: '50%' }
      break
    case 'bottom-left':
      popStyle = { left: 0, top: '100%' }
      break
    case 'bottom':
      popStyle = { left: '50%', top: '100%' }
      break
    case 'bottom-right':
      popStyle = { left: '100%', top: '100%' }
      break
  }

  popStyle.minWidth = 200

  let newStyle = objectAssign({
    position: 'relative',
    display: 'inline-block'
  }, style)

  return (
    <span style={newStyle}>
      {
        content &&
        <div style={popStyle} className={className}>
          <span className={_styles['popover-arrow']} />
          <div style={{padding: 10}} className={_styles['popover-content']}>
            {content}
          </div>
        </div>
      }
      {children}
    </span>
  )
}

FormItemPopover.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  position: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string
}

FormItemPopover.defaultProps = {
  position: 'top-left'
}
