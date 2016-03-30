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
    this.state = {
      value: props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    let value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  handleChange (event, value) {
    if (this.props.readOnly) {
      return;
    }

    if (value === undefined) {
      value = this._input.value;
    }

    if (value && (this.props.type === 'integer' || this.props.type === 'number')) {
      if (!Regs[this.props.type].test(value)) {
        value = this.state.value || '';
      }
    }

    this.setState({ value });
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(value, event);
      }
    }, 0);
  }

  handleTrigger (trigger, event) {
    let value = this._input.value;
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
      type: type === 'password' ? 'password' : 'text',
      value: this.state.value
    };

    ['onBlur', 'onKeyDown', 'onKeyUp'].forEach((key) => {
      if (this.props[key]) {
        props[key] = this.handleTrigger.bind(this, key);
      }
    });

    return (<input ref={(c) => this._input = c} {...this.props} {...props} />);
  }
}

Input.propTypes = {
  className: PropTypes.string,
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

module.exports = register(Input, ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'integer', 'number']);
