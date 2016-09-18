'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import './themes/mui/overlay.less';

class Overlay extends Component {
  render () {
    let className = classnames(
      this.props.className,
      'rct-overlay'
    );

    return (
      <div className={className} style={this.props.style} onClick={this.props.onClick} />
    );
  }
}

Overlay.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};

Overlay.defaultProps = {
  onClick: () => {}
};

module.exports = Overlay;
