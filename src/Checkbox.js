'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { register } from './higherOrders/FormItem';

import './themes/mui/checkbox.less';

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSpareChange = this.handleSpareChange.bind(this);
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value || nextProps.checkValue !== this.props.checkValue) {
      this.setValue(nextProps.value, nextProps.checkValue);
    }
  }

  handleChange (event, checked) {
    if (event && this.props.readOnly) {
      return;
    }

    if (event) {
      checked = event.target.checked;
    }
    setTimeout(() => {
      if (this.props.onChange) {
        let value = checked ? this.props.checkValue : undefined;
        this.props.onChange(value, checked, this.props.index);
      }
    }, 0);
  }

  handleSpareChange (event) {
    this.props.onSpareChange(event.target.value, this.props.index);
  }

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
          checked={this.props.checked}
          value={this.props.value}
        />
        {this.props.children}
        {
          this.props.inputAble &&
          <input onChange={this.handleSpareChange} value={this.props.checkValue} />
        }
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
  inputAble: PropTypes.bool,
  onChange: PropTypes.func,
  onSpareChange: PropTypes.func,
  position: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.any
};

Checkbox.defaultProps = {
  checkValue: true
}

module.exports = register(Checkbox, 'checkbox');

// export for CheckboxGroup
module.exports.Checkbox = Checkbox;
