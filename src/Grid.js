'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';

class Grid extends Component {
  render () {
    let { className, grid, style, children } = this.props;
    className = classnames(
      className,
      getGrid(grid)
    );
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }
}

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  style: PropTypes.object
};

module.exports = Grid;
