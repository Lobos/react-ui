'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Regs from './utils/regs';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';

import { requireCss } from './themes';
requireCss('input');
requireCss('form-control');

class Input extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return;
    }

    let value = event.target.value;
    const { type } = this.props;

    if (value && (type === 'integer' || type === 'number')) {
      if (!Regs[type].test(value)) {
        return;
      }
    }

    if (this.props.onChange) {
      this.props.onChange(value, event);
    }
  }

  handleTrigger (trigger, event) {
    let value = event.target.value;
    this.props[trigger](value, event);
  }

  render () {
    const { className, grid, type } = this.props;
    const props = {
      className: classnames(
        className,
        'rct-form-control',
        getGrid(grid)
      ),
      onChange: this.handleChange,
      type: type === 'password' ? 'password' : 'text'
    };

    ['onBlur', 'onKeyDown', 'onKeyUp'].forEach((key) => {
      if (this.props[key]) {
        props[key] = this.handleTrigger.bind(this, key);
      }
    });

    return (<input {...this.props} {...props} />);
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any
};

Input.defaultProps = {
  value: ''
};

module.exports = register(Input, ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'integer', 'number']);
