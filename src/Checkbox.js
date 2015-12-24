'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { requireCss } from './themes';
requireCss('checkbox');

class Checkbox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: !!this.props.checked
    };
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return;
    }

    this.setState({ checked: event.target.checked });
    if (this.props.onChange) {
      this.props.onChange(event.target.checked, this.props.value, this.props.index);
    }
  }

  getValue () {
    return this.refs.input.checked ? (this.props.value || true) : false;
  }

  setValue (value) {
    var checked = value === true || value === 1 || value === this.state.value;
    this.setState({ checked });
  }

  render () {
    return (
      <label style={this.props.style} className={ classnames(this.props.className, 'rct-checkbox') }>
        <input ref='input'
          type='checkbox'
          disabled={this.props.readOnly}
          onChange={this.handleChange.bind(this)}
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
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
};

import FormControl from './FormControl';
FormControl.register(

  'checkbox',

  function (props) {
    return <Checkbox {...props} />;
  },

  Checkbox
);

module.exports = Checkbox;
