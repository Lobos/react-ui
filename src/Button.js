'use strict';

import { PropTypes, createElement } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';

import Styles from './styles/_buttons.scss';

export default function Button (props) {
  let { children, status, size, grid, tag, className, ...others } = props;

  className = classnames(
    className,
    getGrid(grid),
    Styles.button,
    Styles[size],
    Styles[status]
  );

  return createElement(tag, { className, ...others }, children);
  /*
  return (
    <button {...others} className={className}>
      { children }
    </button>
  );
 */
};

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  grid: PropTypes.object,
  onClick: PropTypes.func,
  once: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small', 'middle']),
  status: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info', 'link']),
  style: PropTypes.object,
  type: PropTypes.oneOf(['submit', 'button'])
};

Button.defaultProps = {
  size: 'middle',
  status: 'secondary',
  tag: 'button',
  type: 'button'
};
