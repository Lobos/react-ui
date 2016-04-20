'use strict';

import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';
import { Checkbox } from './Checkbox';
import { toArray } from './utils/strings';
import { deepEqual, toTextValue, hashcode } from './utils/objects';
import { fetchEnhance, FETCH_SUCCESS } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';
import { getLang } from './lang';

class CheckboxGroup extends Component {
  constructor (props) {
    super(props);

    let values = toArray(props.value, props.sep);
    this.state = {
      value: values,
      data: this.formatData(props.data, values)
    };
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentWillReceiveProps (nextProps) {
    if (!deepEqual(nextProps.value, this.props.value)) {
      this.setValue(nextProps.value);
    }
    if (!deepEqual(nextProps.data, this.props.data)) {
      this.setState({ data: this.formatData(nextProps.data) });
    }
  }

  setValue (value) {
    value = toArray(value, this.props.sep);
    if (this.state) {
      let data = this.state.data.map((d) => {
        d.$checked = value.indexOf(d.$value) >= 0;
        return d;
      });
      this.setState({ value, data });
    } else {
      this.setState({ value });
    }
  }

  formatData (data, value=this.state.value) {
    data = toTextValue(data, this.props.textTpl, this.props.valueTpl).map((d) => {
      d.$checked = value.indexOf(d.$value) >= 0;
      return d;
    });

    Children.map(this.props.children, (child) => {
      if (typeof child === 'object') {
        let position = child.props.position;
        if (position === undefined) {
          position = data.length;
        }
        data = [
          ...data.slice(0, position),
          {
            $checked: value.indexOf(child.props.checkValue) >= 0,
            $value: child.props.checkValue,
            $text: child.props.children || child.props.text,
            $key: hashcode(`${child.props.checkValue}-${child.props.text}`)
          },
          ...data.slice(position)
        ];
      }
    });
    return data;
  }

  getValue (sep=this.props.sep, data=this.state.data) {
    let value = [],
        raw = [];
    data.forEach((d) => {
      if (d.$checked) {
        value.push(d.$value);
        raw.push(d);
      }
    });

    if (sep && typeof sep === 'string') {
      value = value.join(sep);
    } else if (typeof sep === 'function') {
      value = sep(raw);
    }

    return value;
  }

  handleChange (value, checked, index) {
    let data = this.state.data;
    data[index].$checked = checked;
    value = this.getValue(this.props.sep, data);

    this.setState({ value, data });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  renderItems () {
    return this.state.data.map((item, i) => {
      return (
        <Checkbox key={item.$key}
          index={i}
          readOnly={this.props.readOnly}
          checked={item.$checked}
          onChange={this.handleChange}
          text={item.$text}
          checkValue={item.$value}
        />
      );
    });
  }

  render () {
    let { className, fetchStatus, inline } = this.props;

    // if get remote data pending or failure, render message
    if (fetchStatus !== FETCH_SUCCESS) {
      return (
        <span className={`fetch-${fetchStatus}`}>
          {getLang('fetch.status')[fetchStatus]}
        </span>
      );
    }

    className = classnames(
      className,
      'rct-checkbox-group',
      {
        'rct-inline': inline,
        'rct-block': !inline
      }
    );

    return (
      <div style={this.props.style} className={className}>
        {this.renderItems()}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
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
  sep: PropTypes.string,
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
 
CheckboxGroup.defaultProps = {
  data: [],
  sep: ',',
  inline: true,
  textTpl: '{text}',
  valueTpl: '{id}'
};

CheckboxGroup = fetchEnhance(CheckboxGroup);

module.exports = register(CheckboxGroup, 'checkbox-group', {valueType: 'array'});
