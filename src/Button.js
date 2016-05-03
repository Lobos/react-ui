'use strict';

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';

import styles from './styles/_buttons.scss';

const Button = (props) => {
  let { children, status, size, grid, className, ...others } = props;

  className = classnames(
    className,
    getGrid(grid),
    styles.button,
    styles[size],
    styles[status]
  );

  return (
    <button {...others} className={className}>
      { children }
    </button>
  );
}

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
  type: 'button'
};

module.exports = Button;
