'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { register } from './higherOrders/FormItem';

import styles from './styles/_checkbox.scss';

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: !!props.checked || props.value === props.checkValue
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked && nextProps.checked !== this.state.checked) {
      this.handleChange(null, nextProps.checked);
    }
    if (nextProps.value !== this.props.value || nextProps.checkValue !== this.props.checkValue) {
      this.setState({ checked: nextProps.value === nextProps.checkValue });
    }
  }

  handleChange (event, checked) {
    if (this.props.readOnly) {
      return;
    }

    if (event) {
      checked = event.target.checked;
    }
    this.setState({ checked });
    setTimeout(() => {
      if (this.props.onChange) {
        let value = checked ? this.props.checkValue : undefined;
        this.props.onChange(value, checked, this.props.index);
      }
    }, 0);
  }

  render () {
    const { style, className, readOnly, value, text, children } = this.props;

    return (
      <label style={style} className={ classnames(className, styles.checkbox) }>
        <input ref={(c) => this._input = c}
          type="checkbox"
          disabled={readOnly}
          onChange={this.handleChange}
          checked={this.state.checked}
          value={value}
        />
        <span className={styles.indicator}></span>
        {text}
        {children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  checkValue: PropTypes.any,
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func,
  position: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
};

Checkbox.defaultProps = {
  checkValue: true,
  value: ''
}

module.exports = register(Checkbox, 'checkbox');

// export for CheckboxGroup
module.exports.Checkbox = Checkbox;
