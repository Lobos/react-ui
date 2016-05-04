'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { register } from './higherOrders/FormItem';

import styles from './styles/_checkbox.scss';

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleChange(null, nextProps.value === nextProps.defaultValue);
    }
  }

  handleChange (event, checked) {
    const { readOnly, onChange, index } = this.props;

    if (readOnly) {
      return;
    }

    const defaultValue = this.getDefaultValue();

    if (onChange) {
      checked = event ? event.target.checked : checked;
      const value = checked ? defaultValue : undefined;
      onChange(value, checked, index);
    }
  }

  getDefaultValue () {
    let { defaultValue, checkValue } = this.props;

    if (checkValue !== undefined) {
      defaultValue = checkValue;
      console.warn('checkValue is deprecated, use defaultValue instead.');
    }

    return defaultValue;
  }

  getCheckStatus () {
    const { value, checked } = this.props;
    if (checked !== undefined) {
      return checked;
    }
    return value === this.getDefaultValue();
  }

  render () {
    const { style, className, block, readOnly, defaultValue, text, children } = this.props;
    const checked = this.getCheckStatus();

    let labelClass = classnames(
      className,
      styles.checkbox,
      block ? styles.block : styles.inline,
      checked ? styles.checked : undefined
    );

    return (
      <label style={style} className={ labelClass }>
        <input type="checkbox"
          disabled={readOnly}
          onChange={this.handleChange}
          checked={checked}
          value={defaultValue}
        />
        <span className={styles.indicator}></span>
        <span>{text}</span>
        {children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  block: PropTypes.bool,
  checkValue: PropTypes.any,
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  defaultValue: PropTypes.any.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func,
  position: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
};

Checkbox.defaultProps = {
  defaultValue: true
}

module.exports = register(Checkbox, 'checkbox');

// export for CheckboxGroup
module.exports.Checkbox = Checkbox;
