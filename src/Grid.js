'use strict';

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';

const Grid = (props) => {
  let { className, width, offset, responsive, style, children } = props;
  className = classnames(
    className,
    getGrid({ width, offset, responsive })
  );
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  offset: PropTypes.number,
  responsive: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
};

module.exports = Grid;
