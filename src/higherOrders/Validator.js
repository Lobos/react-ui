'use strict';

import { Component } from 'react';
import classnames from 'classnames';
import isEqual from '../utils/isEqual';
import Regs from './utils/regs';
import { format, toArray } from '../utils/strings';

import { getLang, setLang } from './lang';
setLang('validation');

function getHint(hints, key, value) {
  let text = getLang('validation.hints.' + key, null);
  if (text) {
    hints.push(format(text, value));
  }
}

export const Validator = (ComposedComponent) => class extends Component {
  constructor (props) {
    super(props);
    this.valueType = ComposedComponent.valueType || 'string';
    this.state = {
      hasError: false
    };
  }

  componentWillMount () {
    this.setHint(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.validate(nextProps.value);
    }
    if (!isEqual(nextProps, this.props)) {
      this.setHint(nextProps);
    }
  }

  getValue () {
    return this.refs.component.getValue();
  }

  setHint (props) {
    if (props.tip) {
      this.setState({ hintText: props.tip });
      return;
    }

    let hints = [];

    if (props.required) { getHint(hints, 'required'); }
    getHint(hints, this.props.type);
    if (props.min) { getHint(hints, `min.${this.state.valueType}`, props.min); }
    if (props.max) { getHint(hints, `max.${this.state.valueType}`, props.max); }

    this.setState({ hintText: hints.join(', ') });
  }

  onValidate (result, key) {
    // handle error
    if (key) {
      let text = getLang('validation.tips.' + key, null);
      if (text) {
        text = format(text, result);
      } else {
        text = this.props.tip;
      }
      result = new Error(text);
    }
    if (this.props.onValidate) {
      this.props.onValidate(result === true ? this.state.hintText : result);
    }

    let hasError = result !== true;
    this.setState({ hasError });
    return !hasError;
  }

  validate (value) {
    let {
      required,
      min,
      max,
      readOnly,
      sep,
      type,
      validation,
    } = this.props;

    let len = 0,
        valueType = this.valueType;

    if (readOnly) {
      return this.onValidate(true);
    }

    // validate required
    if (required && (value === undefined || value === null || value.length === 0)) {
      return this.onValidate(value, 'required');
    }

    // custom validation
    if (validation) {
      return this.onValidate(validation(value));
    }

    if (value === undefined || value === null || value === '') {
      return this.onValidate(true);
    }

    // validate type
    let reg = Regs[type];
    if (reg && !reg.test(value)) {
      return this.onValidate(value, type);
    }

    switch(valueType) {
      case 'array':
        len = toArray(value, sep).length;
      break;
      case 'number':
        len = parseFloat(value);
      break;
      default:
        len = value.length;
      break;
    }

    if (max && len > max) {
      return this.onValidate(max, `max.${valueType}`);
    }

    if (min && len < min) {
      return this.onValidate(min, `min.${valueType}`);
    }

    /*
    if (this.refs.control.isCompleted && !this.refs.control.isCompleted()) {
      this.validateFail();
      return false;
    }
    */

    return this.onValidate(true);
  }

  onChange (value) {
    this.validate(value);
    if (this.props.onChange) {
      this.props.onChange(...arguments);
    }
  }

  render () {
    let { className, ...props } = this.props;
    className = classnames(className, {
      'has-error': this.state.hasError
    });
    return <ComposedComponent ref="component" className={className} onChange={this.onChange.bind(this)} {...props} />
  }
}
