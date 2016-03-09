'use strict';

import React, { Component, createElement, PropTypes } from 'react';
import classnames from 'classnames';
import { isEmpty, shallowEqual } from '../utils/objects';
import * as Validation from '../utils/validation';

export const COMPONENTS = {};

export const enhance = (ComposedComponent) => {
  class FormItem extends Component {
    constructor (props) {
      super(props);

      const { name, validator, ignore, itemBind, itemChange, formData } = props;

      let value = props.value;
      if (formData && formData[name] !== undefined) {
        value = formData[name];
      }

      this.state = {
        hasError: false,
        value
      };

      this.valueType = getValueType(props.type);
      this.handleChange = this.handleChange.bind(this);

      let valiBind;
      if (validator && validator.bind) {
        valiBind = validator.bind;
        if (typeof valiBind === 'string') {
          valiBind = [valiBind];
        }
      }

      if (name && itemBind) {
        itemBind({
          name,
          valiBind,
          ignore,
          validate: this.validate.bind(this)
        });

        if (value !== undefined) {
          itemChange(name, value);
        }
      }
    }

    componentDidMount () {
      let component = this.component;
      if (!component) {
        return;
      }
      Object.keys(component).forEach((key) => {
        if (!this.hasOwnProperty(key)) {
          let func = component[key];
          if (typeof func === 'function') {
            this[key] = func;
          }
        }
      });
    }

    componentWillReceiveProps (nextProps) {
      let { name, formData } = nextProps;
      if (formData) {
        let value = formData[name];
        if (value !== this.state.value) {
          this.handleChange(value);
        }
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !shallowEqual(nextProps, this.props) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount () {
      const { itemUnbind, name } = this.props;
      if (itemUnbind && name) {
        itemUnbind(name);
      }
    }

    validate (value = this.state.value) {
      let { name, onValidate, ...props } = this.props;
      let result = Validation.validate(value, this.valueType, props);
      this.setState({ hasError: result !== true });
      if (onValidate) {
        onValidate(name, result);
      }
      return result;
    }

    getValue () {
      return this.state.value;
    }

    handleChange (value) {
      let { name, formData, itemChange, onChange } = this.props;
      let result = value instanceof Error ? value : this.validate(value, formData);
      if (name && itemChange) {
        itemChange(name, value, result);
      }
      if (onChange) {
        onChange(...arguments);
      }
      this.setState({ value });
    }

    render () {
      let { className, onChange, value, ...props } = this.props;

      className = classnames(className, {
        'has-error': this.state.hasError
      });
      value = this.state.value;

      // handle checkbox
      //if (props.type === 'checkbox') {
      //  props.checked = value === true || value === 1;
      //}

      return <ComposedComponent ref={(c) => this.component = c} {...props} value={value} className={className} onChange={this.handleChange} />
    }
  }

  FormItem.displayName = 'FormItem';

  FormItem.propTypes = {
    className: PropTypes.string,
    formData: PropTypes.object,
    ignore: PropTypes.bool,
    itemBind: PropTypes.func,
    itemChange: PropTypes.func,
    itemUnbind: PropTypes.func,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    type: PropTypes.string,
    validator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    value: PropTypes.any
  }

  return FormItem;
}

export const register = (ComposedComponent, types, options) => {
  let newComponent = enhance(ComposedComponent);

  if (isEmpty(types)) {
    console.warn(`types must be string or array`);
    return;
  }

  if (!Array.isArray(types)) {
    types = [types];
  }

  let { valueType, render } = options || {};

  types.forEach((type) => {
    if (COMPONENTS.hasOwnProperty(type)) {
      console.warn(`type ${type} was already existed.`);
      return;
    }

    if (!valueType) {
      valueType = ['integer', 'number'].indexOf(type) > -1 ? 'number' : 'string';
    }

    if (!render) {
      render = (props) => createElement(newComponent, props);
    }

    COMPONENTS[type] = { render, valueType };
  });

  return newComponent;
}

export const getValueType = (type) => {
  let valueType = 'string';
  if (COMPONENTS[type]) {
    valueType = COMPONENTS[type].valueType;
  }
  return valueType;
}
