'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Checkbox } from './Checkbox';
import { toArray } from './utils/strings';
import isEqual from './utils/isEqual';
import { toTextValue } from './utils/objects';
import { fetchEnhance } from './higherOrders/Fetch';
import { register } from './higherOrders/FormItem';

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
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    }
    if (!isEqual(nextProps.data, this.props.data)) {
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

    if (typeof sep === 'string') {
      value = value.join(sep);
    } else if (typeof sep === 'function') {
      value = sep(raw);
    }

    return value;
  }

  handleChange (value, checked, index) {
    /*
    console.log(index);
    let values = this.state.value;
    if (checked) {
      values.push(value);
    } else {
      let i = values.indexOf(value);
      if (i >= 0) {
        values.splice(i, 1);
      }
    }
    */
    let data = this.state.data;
    data[index].$checked = checked;
    value = this.getValue(this.props.sep, data);

    this.setState({ value, data });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-checkbox-group',
      { 'rct-inline': this.props.inline }
    );
    let values = this.state.value;

    let items = this.state.data.map((item, i) => {
      let value = this.props.sep ? item.$value.toString() : item.$value;
      let checked = values.indexOf(value) >= 0;
      return (
        <Checkbox key={i}
          index={i}
          readOnly={this.props.readOnly}
          checked={checked}
          onChange={this.handleChange}
          text={item.$text}
          value={item.$value}
        />
      );
    });

    return (
      <div style={this.props.style} className={className}>{this.state.msg || items}</div>
    );
  }
}

CheckboxGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  sep: PropTypes.string,
  style: PropTypes.object,
  textTpl: PropTypes.string,
  value: PropTypes.any,
  valueTpl: PropTypes.string
};
 
CheckboxGroup.defaultProps = {
  data: [],
  sep: ',',
  textTpl: '{text}',
  valueTpl: '{id}'
};

CheckboxGroup = fetchEnhance(CheckboxGroup);

module.exports = register(CheckboxGroup, 'checkbox-group', { valueType: 'array' });
