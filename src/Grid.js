'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import getGrid from './higherorder/grid';

class Grid extends Component {
  render () {
    const className = classnames(
      this.props.className,
      this.getGrid()
    );
    return (
      <div style={this.props.style} className={className}>
        {this.props.children}
      </div>
    );
  }
}

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
};

module.exports = getGrid(Grid);
