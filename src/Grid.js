'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';

class Grid extends Component {
  render () {
    let { className, width, offset, responsive, style, children } = this.props;
    className = classnames(
      className,
      getGrid({ width, offset, responsive })
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
  offset: PropTypes.offset,
  responsive: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
};

module.exports = Grid;
