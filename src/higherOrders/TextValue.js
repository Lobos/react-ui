'use strict';

// data pretreatment

import React, { PropTypes, Children } from 'react';
import curry from 'curry';
import { toArray } from '../utils/strings';
import { deepEqual, toTextValue, hashcode } from '../utils/objects';

export const textValueEnhance = curry((single, Component) => {
  class TextValue extends React.Component {
    constructor (props) {
      super(props);

      let values = toArray(props.value, props.sep);
      this.state = {
        values,
        data: this.formatData(props.data, values)
      };
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
      if (!deepEqual(nextProps.value, this.props.value)) {
        this.setValue(nextProps.value);
      }
      if (!deepEqual(nextProps.data, this.props.data)) {
        this.setState({ data: this.formatData(nextProps.data, this.state.values) });
      }
    }

    setValue (value) {
      let values = toArray(value, this.props.sep);
      if (this.state) {
        let data = this.state.data.map((d) => {
          d.$checked = values.indexOf(d.$value) >= 0;
          return d;
        });
        this.setState({ values, data });
      } else {
        this.setState({ values });
      }
    }

    formatData (data, values) {
      data = toTextValue(data, this.props.textTpl, this.props.valueTpl).map((d) => {
        d.$checked = values.indexOf(d.$value) >= 0;
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
              $checked: values.indexOf(child.props.defaultValue) >= 0,
              $value: child.props.defaultValue,
              $text: child.props.children || child.props.text,
              $key: hashcode(`${child.props.defaultValue}-${child.props.text}`)
            },
            ...data.slice(position)
          ];
        }
      });
      return data;
    }

    handleChange (value, checked, index) {
      const { sep, onChange } = this.props;
      let data = this.state.data,
          values = [],
          raw = [];

      if (single) {
        data.forEach((d, i) => {
          d.$checked = index === i;
        });
        values = [value];
      } else {
        data[index].$checked = checked;
        data.forEach((d) => {
          if (d.$checked) {
            values.push(d.$value);
            raw.push(d);
          }
        });

        if (sep && typeof sep === 'string') {
          value = values.join(sep);
        } else if (typeof sep === 'function') {
          value = sep(raw);
        } else {
          value = values;
        }
      }
      this.setState({ values, data });

      if (onChange) {
        onChange(value);
      }
    }

    render () {
      return (
        <Component {...this.props}
          data={this.state.data}
          onChange={this.handleChange}
        />
      );
    }
  }

  TextValue.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ]),
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    sep: PropTypes.string,
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

  TextValue.defaultProps = {
    data: [],
    sep: ',',
    textTpl: '{text}',
    valueTpl: '{id}'
  };

  return TextValue;
});
