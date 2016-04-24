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
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    let value = nextProps.value;
    if (value !== this.props.value && value !== this.state.value) {
      this.setState({ value });
    }
  }

  handleChange (event) {
    const { readOnly, type, trigger } = this.props;

    if (readOnly) {
      return;
    }

    let value = event.target.value;

    if (value && (type === 'integer' || type === 'number')) {
      if (!Regs[type].test(value)) {
        value = this.state.value || '';
      }
    }

    this.setState({ value });

    if (trigger === 'change') {
      this.handleTrigger(event);
    }
  }

  handleTrigger (event) {
    let value = event.target.value;
    this.props.onChange(value, event);
  }

  render () {
    const { className, grid, type, trigger, ...other } = this.props;
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

    if (trigger !== 'change') {
      let handle = 'on' + trigger.charAt(0).toUpperCase() + trigger.slice(1);
      props[handle] = this.handleTrigger;
    }

    return (<input {...other} {...props} />);
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
  trigger: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any
};

Input.defaultProps = {
  trigger: 'blur',
  value: ''
};

module.exports = register(Input, ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'integer', 'number']);
