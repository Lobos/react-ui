'use strict';

import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';
import { deepEqual, toTextValue, hashcode } from './utils/objects';
import { fetchEnhance, FETCH_SUCCESS } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { getLang } from './lang';
import Radio from './Radio';

function transformValue(value) {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value !== 'string') {
    value = value.toString();
  }

  return value;
}

class RadioGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: transformValue(props.value),
      data: this.formatData(props.data)
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (!deepEqual(nextProps.data, this.props.data)) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  formatData (data) {
    data = toTextValue(data, this.props.textTpl, this.props.valueTpl);
    Children.map(this.props.children, (child) => {
      if (typeof child === 'object') {
        let position = child.props.position;
        if (position === undefined) {
          position = data.length;
        }
        data = [
          ...data.slice(0, position),
          {
            $value: child.props.value,
            $text: child.props.children || child.props.text,
            $key: hashcode(`${child.props.value}-${child.props.text}`)
          },
          ...data.slice(position)
        ];

      }
    });
    return data;

  }

  setValue (value) {
    value = transformValue(value);
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
      change(value);
    }
  }

  render () {
    let { className, fetchStatus, inline, readOnly } = this.props;

    // if get remote data pending or failure, render message
    if (fetchStatus !== FETCH_SUCCESS) {
      return <span className={`fetch-${fetchStatus}`}>{getLang('fetch.status')[fetchStatus]}</span>;
    }

    className = classnames(
      className,
      'rct-radio-group',
      { 'rct-inline': inline }
    );
    let items = this.state.data.map(function (item) {
      return (
        <Radio key={item.$key}
          onClick={this.handleChange}
          readOnly={readOnly}
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  fetchStatus: PropTypes.string,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  textTpl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  value: PropTypes.any,
  valueTpl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
};

RadioGroup.defaultProps = {
  textTpl: '{text}',
  valueTpl: '{id}',
  inline: true
};

RadioGroup = fetchEnhance(RadioGroup);

module.exports = register(RadioGroup, 'radio-group');
