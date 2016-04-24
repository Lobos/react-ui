'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { register } from './higherOrders/FormItem';

import { requireCss } from './themes';
requireCss('checkbox');

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
      this.setValue(nextProps.value, nextProps.checkValue);
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

  /*
  getValue () {
    return this._input.checked ? (this.props.value || true) : false;
  }
  */

  setValue (value, checkValue=this.props.checkValue) {
    this.setState({ checked: value === checkValue });
  }

  render () {
    return (
      <label style={this.props.style} className={ classnames(this.props.className, 'rct-checkbox') }>
        <input ref={(c) => this._input = c}
          type="checkbox"
          disabled={this.props.readOnly}
          onChange={this.handleChange}
          checked={this.state.checked}
          value={this.props.value}
        />
        {this.props.text}
        {this.props.children}
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
  checkValue: true
}

module.exports = register(Checkbox, 'checkbox');

// export for CheckboxGroup
module.exports.Checkbox = Checkbox;
