"use strict";

import { Component, PropTypes } from 'react';

import { requireCss } from './themes';
requireCss('checkbox');

class Radio extends Component {
  handleClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, this.props.index);
    }
  }

  render () {
    return (
      <label style={this.props.style} className="rct-radio">
        <input ref="input"
          type="radio"
          disabled={this.props.readOnly}
          onChange={() => {}}
          onClick={this.handleClick.bind(this)}
          checked={this.props.checked}
          value={this.props.value}
        />
        <span>{this.props.text}</span>
      </label>
    );
  }
}

Radio.propTypes = {
  checked: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
};

module.exports = Radio;
