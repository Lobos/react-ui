'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { register } from './higherOrders/FormItem';
import { shallowEqual } from './utils/objects';

import Styles from './styles/_radio-checkbox.scss';

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

  shouldComponentUpdate (nextProps) {
    return !shallowEqual(this.props, nextProps);
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
      Styles.checkbox,
      readOnly && Styles.disabled,
      block ? Styles.block : Styles.inline,
      checked && Styles.checked
    );

    return (
      <label style={style} className={ labelClass }>
        <input type="checkbox"
          disabled={readOnly}
          onChange={this.handleChange}
          checked={checked}
          value={defaultValue}
        />
        <span className={Styles.indicator}></span>
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

module.exports = register('checkbox', {}, Checkbox);

module.exports.Checkbox = Checkbox;
