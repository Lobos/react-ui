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
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    let value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  setValue (value) {
    this.handleChange(null, value);
  }

  getValue () {
    return this._input.value;
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
        this.props.onChange(value);
      }
    }, 0);
  }

  render () {
    const props = {
      className: classnames(
        this.props.className,
        'rct-form-control',
        getGrid(this.props.grid)
      ),
      onChange: this.handleChange,
      type: this.props.type === 'password' ? 'password' : 'text',
      value: this.state.value
    };

    if (this.props.type === 'textarea') {
      return (<textarea ref={(c) => this._input = c} {...this.props} {...props} rows={this.props.rows} />);
    } else {
      return (<input ref={(c) => this._input = c} {...this.props} {...props} />);
    }
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

module.exports = register(Input, ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'textarea', 'integer', 'number']);
