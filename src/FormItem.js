'use strict';

import React, { cloneElement, PropTypes } from 'react';
import { enhance } from './higherOrders/FormItem';

class FormItem extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (value) {
    if (value && value.nativeEvent) {
      value = value.target.value;
    }
    this.props.onChange(value);
  }

  render () {
    return cloneElement(this.props.children, {
      value: this.props.value || '',
      onChange: this.handleChange
    });
  }
}

FormItem.propTypes = {
  children: PropTypes.element,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

module.exports = enhance(FormItem);
