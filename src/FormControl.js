"use strict";

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { isEmpty, forEach } from './utils/objects';
import { format, toArray } from './utils/strings';
import merge from './utils/merge';
import Regs from './utils/regs';
import { getGrid } from './utils/grids';

import { requireCss } from './themes';
requireCss('form-control');

import { getLang, setLang } from './lang';
setLang('validation');

const CONTROLS = {};

function getTip(key, value) {
  let text = getLang('validation.tips.' + key, null);
  if (text) {
    text = format(text, value);
  }
  return text;
}

function getHint(hints, key, value) {
  let text = getLang('validation.hints.' + key, null);
  if (text) {
    hints.push(format(text, value));
  }
}

class FormControl extends Component {
  constructor (props) {
    super(props);
    this.state = {
      focused: false,
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      valueType: CONTROLS[this.props.type].valueType,
      data: this.props.data,
      hintText: ''
    };
  } 

  componentWillMount () {
    this.setHint(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.setHint(nextProps);
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

  getReference () {
    return this.refs.control;
  }

  validate (value) {
    value = value || this.getValue(null);

    this.setState({ hasValue: !isEmpty(value) });

    let {
      required,
      min,
      max,
      readOnly,
      type
    } = this.props;

    if (readOnly) {
      return true;
    }

    // validate require
    if (required && (value === undefined || value === null || value.length === 0)) {
      this.validateFail('required', value);
      return false;
    }

    if (this.props.onValidate && !this.props.onValidate()) {
      this.validateFail('', value);
      return false;
    }

    if (value === undefined || value === null || value === '') {
      this.validatePass();
      return true;
    }

    // validate type
    let reg = Regs[type];
    if (reg && !reg.test(value)) {
      this.validateFail(type, value);
      return false;
    }

    let len = 0;
    let valueType = this.state.valueType;

    switch(valueType) {
      case 'array':
        len = toArray(value, this.props.sep).length;
      break;
      case 'number':
        len = parseFloat(value);
      break;
      default:
        len = value.length;
      break;
    }

    if (max && len > max) {
      this.validateFail(`max.${valueType}`, max);
      return false;
    }

    if (min && len < min) {
      this.validateFail(`min.${valueType}`, min);
      return false;
    }

    if (this.refs.control.isCompleted && !this.refs.control.isCompleted()) {
      this.validateFail();
      return false;
    }

    this.validatePass();
    return true;
  }

  validatePass () {
    this.setState({ hasError: false, errorText: '' });
  }

  validateFail (type, value) {
    let text = getTip(type, value) || this.props.tip;
    this.setState({ hasError: true, errorText: text });
  }

  handleChange (value) {
    this.validate(this.refs.control.getValue(null));
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  getValue (sep) {
    return this.refs.control.getValue(sep);
  }

  setValue (value) {
    if (this.refs.control.setValue) {
      this.refs.control.setValue(value);
    }
    this.validate(value);
  }

  handleFocus (focused) {
    this.setState({ focused });
  }

  copyProps () {
    let props = {};
    forEach(this.props, (v, k) => {
      props[k] = v;
    });
    props.ref = 'control';
    props.value = this.state.value;
    props.onChange = this.handleChange.bind(this);
    props.onFocus = this.handleFocus.bind(this, true);
    props.onBlur = this.handleFocus.bind(this, false);

    if (props.layout === 'inline') {
      props.placeholder = props.placeholder || props.label;
    }

    // It's important use state.data instead of props.data
    // Otherwise control.data will be refreshed after setState
    props.data = this.state.data;

    return props;
  }

  getChildren (children, component) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    let newChildren = [];
    children.map((child, i) => {
      let props = { key: i };
      if (child.type === component) {
        props.ref = 'control';
      }
      if (child.props && typeof child.props.children === 'object') {
        props.children = this.getChildren(child.props.children, component);
      }
      child = React.cloneElement(child, props);
      newChildren.push(child);
    });
    return newChildren;
  }

  getControl (props) {
    let control = CONTROLS[this.props.type];
    if (!control) {
      console.warn(`${this.props.type} was not registed.`);
      return null;
    }

    let children = this.props.children;
    if (children) {
      return this.getChildren(children, control.component);
    } else {
      props = merge(this.copyProps(), props || {});
      return control.render(props);
    }
  }

  renderInline (className) {
    className = classnames(className, getGrid(this.props.grid));
    return (
      <div style={this.props.style} className={className}>
        {this.getControl({grid: { width: 1 }})}
        {
          this.state.errorText ?
          <span className="error">{this.state.errorText}</span> :
          ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
        }
      </div>
    );
  }

  renderStacked (className) {
    return (
      <div style={this.props.style} className={className}>
        <label className="label">{this.props.label}</label>
        <div>
          {this.getControl()}
          {
            this.state.errorText ?
            <span className="error">{this.state.errorText}</span> :
            ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
          }
        </div>
      </div>
    );
  }

  render () {
    let hintType = this.props.hintType ?
                   this.props.hintType :
                   ( this.props.layout === 'inline' ? 'pop' : 'block' );
    let className = classnames(
      this.props.className,
      'rct-control-group',
      `rct-hint-${hintType}`,
      {
        'rct-has-error': this.state.hasError,
        'focused': this.state.focused
      }
    );

    if (this.props.layout === 'inline') {
      return this.renderInline(className);
    } else {
      return this.renderStacked(className);
    }
  }
}

// register component
FormControl.register = function (types, render, component, valueType = 'string') {
  if (typeof types === 'string') {
    types = [types];
  }
  types.forEach((type) => {
    CONTROLS[type] = { render, component, valueType };
  });
};

FormControl.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.any,
  grid: PropTypes.object,
  hintType: PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
  id: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.oneOf(['aligned', 'stacked', 'inline']),
  name: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any
};

FormControl.defaultProps = {
  layout: 'inline',
  type: 'text'
};

module.exports = FormControl;
