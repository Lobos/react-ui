import React from 'react'
import PropTypes from './utils/proptypes'
import Tooltip from './Tooltip'

export default function Popover (props) {
  const { children, ...other } = props

  return (
    <Tooltip {...other} content={children[1]}>
      {children[0]}
    </Tooltip>
  )
}

Popover.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']),
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover'])
}

Popover.defaultProps = {
  position: 'top',
  trigger: 'click'
}
