'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import Regs from './utils/regs';
import { getGrid } from './utils/grids';
import { register } from './higherOrders/FormItem';
import PropTypes from './utils/proptypes';

import Styles from './styles/_input.scss';

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value
    };

    this.imeLock = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleCompositionStart = this.handleCompositionStart.bind(this);
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this);
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

    if (trigger === 'change' && !this.imeLock) {
      this.props.onChange(value);
    }
  }

  handleTrigger (event) {
    let value = event.target.value;
    this.props.onChange(value, event);
  }

  handleCompositionStart () {
    this.imeLock = true;
  }

  handleCompositionEnd () {
    this.imeLock = false;
  }

  render () {
    const { className, grid, type, size, readOnly, trigger, ...other } = this.props;
    const props = {
      className: classnames(
        className,
        Styles.input,
        Styles[size],
        readOnly && Styles.disabled,
        getGrid(grid)
      ),
      readOnly,
      onChange: this.handleChange,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd,
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
  grid: PropTypes.grid,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  size: PropTypes.oneOf(['small', 'large', 'middle']),
  style: PropTypes.object,
  trigger: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any
};

Input.defaultProps = {
  size: 'middle',
  trigger: 'change',
  value: ''
};

export default register(
  ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'integer', 'number'],
  {},
  Input
);
