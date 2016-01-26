'use strict';

import { Component, createElement, PropTypes } from 'react';
import classnames from 'classnames';
import { isEmpty, shallowEqual } from '../utils/objects';
import * as Validation from '../utils/validation';

export const COMPONENTS = {};

export const enhance = (ComposedComponent) => {
  class FormItem extends Component {
    constructor (props) {
      super(props);

      this.state = {
        hasError: false,
        value: props.value
      };

      this.valueType = getValueType(props.type);
      this.handleChange = this.handleChange.bind(this);

      const { name, value, validator, ignore, itemBind, itemChange } = props;
      let valiBind;
      if (validator && validator.bind) {
        valiBind = validator.bind;
        if (typeof valiBind === 'string') {
          valiBind = [valiBind];
        }
      }

      if (name) {
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

    /*
    componentWillReceiveProps (nextProps) {
      console.log(nextProps);
    }
    */

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
      let result = this.validate(value, formData);
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
      if (props.type === 'checkbox') {
        props.checked = value === true || value === 1;
      }

      return <ComposedComponent {...props} value={value} className={className} onChange={this.handleChange} />
    }
  }

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
