"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { getGrid } from './utils/grids';
import { requireCss } from './themes';
requireCss('buttons');

class Button extends Component {
  constructor (props) {
    super(props);
    this.state = {
      disabled: this.props.disabled,
      show: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  disable(elem) {
    this.setState({ disabled: true, show: elem });
  }

  enable(elem) {
    this.setState({ disabled: false, show: elem });
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.props.once) {
      this.disable();
    }
  }

  render() {
    let status = this.props.status;
    if (status) {
      status = `rct-button-${status}`;
    }

    const className = classnames(
      this.props.className,
      getGrid(this.props.grid),
      'rct-button',
      status
    );

    return (
      <button onClick={this.handleClick.bind(this)}
        style={this.props.style}
        disabled={this.state.disabled}
        className={className}
        type={this.props.type || 'button'}>
        { this.state.show || this.props.children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  once: PropTypes.bool,
  status: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['submit', 'button'])
};

module.exports = Button;

