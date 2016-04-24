'use strict';

import React, { Component, createElement, PropTypes } from 'react';
import classnames from 'classnames';
import { shallowEqual } from '../utils/objects';
import * as Validation from '../utils/validation';
import { toStyleObject, nextUid } from '../utils/strings';

export const COMPONENTS = {};

export const enhance = (ComposedComponent) => {
  class FormItem extends Component {
    constructor (props) {
      super(props);

      this.state = {
        hasError: false,
        value: getValue(props)
      };

      this.valueType = getValueType(props.type);
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
      const { itemBind } = this.props;

      if (itemBind) {
        const value = getValue(this.props);
        this.bindToForm(this.props, value);
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
      let { name, value, formData, itemUnbind } = nextProps;

      if (nextProps.type && nextProps.type !== this.props.type) {
        this.valueType = getValueType(nextProps.type);
      }

      if (formData) {
        value = formData[name];

        if (this.props.name !== name && itemUnbind) {
          itemUnbind(this.id, this.props.name);
          this.bindToForm(nextProps, value);
        }

        if (value !== this.state.value) {
          this.handleChange(value, nextProps);
        }
      } else {
        if (value !== this.props.value && value !== this.state.value) {
          this.handleChange(value, nextProps);
        }
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return !shallowEqual(nextProps, this.props) || !shallowEqual(this.state, nextState);
    }

    componentWillUnmount () {
      const { itemUnbind, name } = this.props;
      if (itemUnbind) {
        itemUnbind(this.id, name);
      }
    }

    bindToForm (props, value) {
      const { name, validator, ignore, itemBind } = props;
      this.id = nextUid();
      let valiBind;
      if (validator && validator.bind) {
        valiBind = validator.bind;
        if (typeof valiBind === 'string') {
          valiBind = [valiBind];
        }
      }

      itemBind({
        id: this.id,
        name,
        valiBind,
        ignore,
        value,
        validate: this.validate.bind(this)
      });
    }

    validate (value = this.state.value, props = this.props) {
      let { onValidate, ...other } = props;
      let result = Validation.validate(value, this.valueType, other);
      this.setState({ hasError: result !== true });
      if (onValidate) {
        onValidate(this.id, result);
      }
      return result;
    }

    getValue () {
      return this.state.value;
    }

    setValue (value) {
      this.handleChange(value);
    }

    handleChange (value, props) {
      if (!props || typeof props !== 'object' || props.nativeEvent) {
        props = this.props;
      }
      if (typeof value === 'object' && value.nativeEvent) {
        value = value.target.value;
      }
      let { itemChange, onChange } = props;
      let result = value instanceof Error ? value : this.validate(value, props);
      this.setState({ value }, () => {
        itemChange = itemChange || this.props.itemChange;
        onChange = onChange || this.props.onChange;
        if (itemChange) {
          itemChange(this.id, value, result);
        }
        if (onChange) {
          onChange(...arguments);
        }
      });
    }

    render () {
      let { className, onChange, value, style, ...props } = this.props;

      className = classnames(className, {
        'has-error': this.state.hasError
      });
      value = this.state.value;

      if (typeof style === 'string') {
        style = toStyleObject(style);
      }

      return <ComposedComponent ref={(c) => this.component = c} {...props} onChange={this.handleChange} style={style} value={value} className={className} />
    }
  }

  FormItem.displayName = 'FormItem';

  FormItem.isFormItem = true;

  FormItem.propTypes = {
    className: PropTypes.string,
    formData: PropTypes.object,
    ignore: PropTypes.bool,
    itemBind: PropTypes.func,
    itemChange: PropTypes.func,
    itemRename: PropTypes.func,
    itemUnbind: PropTypes.func,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    sep: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    type: PropTypes.string,
    validator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    value: PropTypes.any
  };

  FormItem.defaultProps = {
    sep: ','
  };

  return FormItem;
}

export const register = (ComposedComponent, types=[], options={}) => {
  let newComponent = enhance(ComposedComponent);

  // allow empty type
  //if (isEmpty(types)) {
  //  console.warn('types must be string or array');
  //  return;
  //}

  if (!Array.isArray(types)) {
    types = [types];
  }

  types.forEach((type) => {
    if (COMPONENTS.hasOwnProperty(type)) {
      console.warn(`type ${type} was already existed.`);
      return;
    }

    let { valueType, render } = options;
    if (!valueType) {
      valueType = ['integer', 'number'].indexOf(type) > -1 ? 'number' : 'string';
    }

    if (!render) {
      render = (props) => createElement(newComponent, props);
    }

    COMPONENTS[type] = { render, valueType, component: ComposedComponent };
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

function getValue(props) {
  let { value, name, formData } = props;
  if (formData && formData[name] !== undefined) {
    value = formData[name];
  }

  return value;
}
