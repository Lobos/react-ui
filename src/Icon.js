'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
let prefix = 'icon';

class Icon extends Component {
  constructor (props) {
    super(props);
    this.state = {
      spin: this.props.spin
    };
  }

  spin () {
    this.setState({ spin: true });
  }

  unspin () {
    this.setState({ spin: false });
  }

  render () {
    let classes = [`${prefix}`];

    if (this.state.spin) {
      classes.push(`${prefix}-spin`);
    }

    if (this.props.icon) {
      classes.push(`${prefix}-${this.props.icon}`);
    }

    let size = this.props.size;
    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x';
      }
      classes.push(`${prefix}-${size}`);
    }

    return (
      <i style={this.props.style} className={classnames(...classes)}></i>
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spin: PropTypes.bool,
  style: PropTypes.object
};

Icon.setPrefix = function (pre) {
  prefix = pre;
};

module.exports = Icon;
