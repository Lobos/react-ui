import { createElement } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { getGrid } from './utils/grids'

import Styles from './styles/_buttons.scss'

export default function Button (props) {
  let { children, status, size, grid, tag, className, ...others } = props

  className = classnames(
    className,
    getGrid(grid),
    Styles.button,
    Styles[size],
    Styles[status]
  )

  if (others.href) tag = 'a'

  return createElement(tag, { className, ...others }, children)
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  grid: PropTypes.grid,
  onClick: PropTypes.func,
  once: PropTypes.bool,
  size: PropTypes.size,
  status: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info', 'link']),
  style: PropTypes.object,
  type: PropTypes.oneOf(['submit', 'button', 'reset'])
}

Button.defaultProps = {
  size: 'middle',
  status: 'secondary',
  tag: 'button',
  type: 'button'
}
