'use strict';

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';
import { toArray } from './utils/strings';
import { toTextValue } from './utils/objects';

class CheckboxGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.formatValue(this.props.value),
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

  formatValue (value) {
    return toArray(value, this.props.sep);
  }

  getValue (sep) {
    let value = this.state.value;
    if (sep === undefined) {
      sep = this.props.sep;
    }
    if (sep) {
      value = value.join(sep);
    }
    return value;
  }

  setValue (value) {
    this.setState({ value: this.formatValue(value) });
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

  handleChange (checked, value) {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    let values = this.state.value;
    if (checked) {
      values.push(value);
    } else {
      let i = values.indexOf(value);
      if (i >= 0) {
        values.splice(i, 1);
      }
    }

    if (this.props.onChange) {
      this.props.onChange(this.props.sep ? values.join(this.props.sep) : values);
    }

    this.setState({ value: values });
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
          onChange={this.handleChange.bind(this)}
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
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]).isRequired,
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
  sep: ',',
  textTpl: '{text}',
  valueTpl: '{id}'
};

import FormControl from './FormControl';
FormControl.register(

  'checkbox-group',

  function (props) {
    return <CheckboxGroup {...props} />;
  },

  CheckboxGroup,

  'array'
);

module.exports = CheckboxGroup;
