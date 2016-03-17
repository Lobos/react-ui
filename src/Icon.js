'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
let prefix = 'icon';

class Icon extends Component {
  constructor (props) {
    super(props);
    this.state = {
      spin: props.spin
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ spin: nextProps.spin });
  }

  render () {
    let classes = [`${prefix}`];
    let { style, font, size, icon } = this.props;

    if (this.state.spin) {
      classes.push(`${prefix}-spin`);
    }

    if (icon) {
      classes.push(`${prefix}-${icon}`);
    }

    if (font) {
      style.fontFamily = font;
    }

    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x';
      }
      classes.push(`${prefix}-${size}`);
    }

    return (
      <i style={style} className={classnames(...classes)}>
        {this.props.children}
      </i>
    );
  }
}

Icon.propTypes = {
  children: PropTypes.any,
  font: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spin: PropTypes.bool,
  style: PropTypes.object
};

Icon.setPrefix = function (pre) {
  prefix = pre;
};

module.exports = Icon;
