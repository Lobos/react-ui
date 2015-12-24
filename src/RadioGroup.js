"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { toTextValue } from './utils/objects';
import Radio from './Radio';

class RadioGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      data: this.formatData(this.props.data)
    };
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (nextProps.data !== this.props.data) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  formatData (data) {
    if (typeof data === 'function') {
      data.then((res) => {
        this.setState({ data: this.formatData(res) });
      })();
      return [];
    } else {
      return toTextValue(data, this.props.textTpl, this.props.valueTpl);
    }
  }

  setValue (value) {
    this.setState({ value });
  }

  getValue () {
    return this.state.value;
  }

  handleChange (value) {
    if (this.props.readOnly) {
      return;
    }

    this.setState({ value });
    let change = this.props.onChange;
    if (change) {
      setTimeout(function () {
        change(value);
      }, 0);
    }
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-radio-group',
      { 'rct-inline': this.props.inline }
    );
    let items = this.state.data.map(function (item, i) {
      return (
        <Radio key={i}
          onClick={this.handleChange.bind(this)}
          readOnly={this.props.readOnly}
          checked={this.state.value === item.$value}
          text={item.$text}
          value={item.$value}
        />
      );
    }, this);

    return (
      <div style={this.props.style} className={className}>{items}</div>
    );
  }
}

RadioGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]).isRequired,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  textTpl: PropTypes.string,
  value: PropTypes.any,
  valueTpl: PropTypes.string
};

RadioGroup.defaultProps = {
  textTpl: '{text}',
  valueTpl: '{id}'
};

import FormControl from './FormControl';
FormControl.register(

  'radio-group',

  function (props) {
    return <RadioGroup {...props} />;
  },

  RadioGroup

);

module.exports = RadioGroup;
