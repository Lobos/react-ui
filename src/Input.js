'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Regs from './utils/regs';
import { getGrid } from './utils/grids';

import { requireCss } from './themes';
requireCss('input');
requireCss('form-control');

class Input extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
  }

  getValue () {
    return this.refs.input.value;
  }

  setValue (value) {
    this.setState({ value });
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return;
    }

    let value = event.target.value;

    if (value && (this.props.type === 'integer' || this.props.type === 'number')) {
      if (!Regs[this.props.type].test(value)) {
        value = this.state.value || '';
      }
    }

    this.setState({ value });
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }, 0);
  }

  render () {
    const props = {
      className: classnames(
        this.props.className,
        'rct-form-control',
        getGrid(this.props.grid)
      ),
      onChange: this.handleChange.bind(this),
      type: this.props.type === 'password' ? 'password' : 'text',
      value: this.state.value
    };

    if (this.props.type === 'textarea') {
      return (<textarea ref="input" {...this.props} {...props} rows={this.props.rows} />);
    } else {
      return (<input ref="input" {...this.props} {...props} />);
    }
  }
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any
};

import FormControl from './FormControl';

FormControl.register(

  ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'textarea'],

  function (props) {
    return <Input {...props} />;
  },

  Input

);

FormControl.register(

  ['integer', 'number'],

  function (props) {
    return <Input {...props} />;
  },

  Input,

  'number'

);

module.exports = Input;
