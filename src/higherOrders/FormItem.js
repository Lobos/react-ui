'use strict';

import { Component, createElement, PropTypes } from 'react';
import classnames from 'classnames';
import { isEmpty } from '../utils/objects';

export const COMPONENTS = {};

export const enhance = (ComposedComponent) => {
  class FormData extends Component {
    constructor (props) {
      super(props);
      // 后面做性能测试，决定是否在这里加入immutablejs
    }

    componentWillMount () {
      const { form, ...props } = this.props;
      if (form) {
        form.itemBind(props);
      }
    }

    onChange (value) {
      let props = this.props;
      if (props.form) {
        props.form.itemChange(props.name, value);
      }
      if (props.onChange) {
        props.onChange(value);
      }
    }

    render () {
      let { className, hasError, onChange, ...props } = this.props;
      className = classnames(className, {
        'has-error': hasError
      });
      return <ComposedComponent className={className} onChange={this.onChange.bind(this)} {...props} />
    }
  }

  FormData.propTypes = {
    name: PropTypes.string
  }

  return FormData;
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
