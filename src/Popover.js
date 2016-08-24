import { PropTypes } from 'react'
import Tooltip from './Tooltip'

export default function Popover (props) {
  const { children, ...other } = props

  if (children.length < 2) {
    console.warn("Popover's children must be an array with 2 element.")
    return <noscript />
  }

  return (
    <Tooltip {...other} content={children[1]} trigger="click">
      {children[0]}
    </Tooltip>
  )
}

Popover.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  style: PropTypes.object
}
