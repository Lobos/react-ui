"use strict"

require('../../less/checkbox.less')

import React from 'react'
import Checkbox from './checkbox.jsx'
import Strings from '../utils/strings'
import Classable from '../mixins/classable'
import Objects from '../utils/objects'
import Resource from '../mixins/resource'
import ReceiveValue from '../mixins/receive-value'

const CheckboxGroup = React.createClass({
  displayName: "CheckboxGroup",

  propTypes: {
    data: React.PropTypes.array,
    inline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    src: React.PropTypes.string,
    stringify: React.PropTypes.bool,
    textKey: React.PropTypes.string,
    value: React.PropTypes.any,
    valueKey: React.PropTypes.string
  },

  mixins: [Classable, ReceiveValue, Resource],

  getInitialState: function () {
    return {
      data: []
    }
  },

  formatValue: function (value) {
    return Strings.formatValue(value, this.props.stringify)
  },

  initData: function (data) {
    data = Objects.toTextValue(data, this.props.textKey, this.props.valueKey)
    this.setState({ data: data })
  },

  handleChange: function (checked, value) {
    if (typeof value !== 'string') {
      value = value.toString()
    }

    let values = this.state.value
    if (checked) {
      values.push(value)
    } else {
      let i = values.indexOf(value)
      if (i >= 0) {
        values.splice(i, 1)
      }
    }

    if (this.props.onChange) {
      this.props.onChange(values)
    }

    this.setState({ value: values })
  },

  getValue: function (raw) {
    let value = this.state.value
    if (this.props.stringify && raw !== true) {
      value = value.join(',')
    }
    return value
  },

  render: function () {
    let className = this.getClasses(
      'checkbox-group',
      {
        'inline': this.props.inline
      }
    )
    let values = this.state.value

    let items = this.state.data.map(function (item, i) {
      let value = this.stringify ? item.value.toString() : item.value
      let checked = values.indexOf(value) >= 0
      return (
        <Checkbox key={i} index={i} readOnly={this.props.readOnly} checked={checked} onChange={this.handleChange} text={item.text} value={item.value} />
      )
    }, this)

    return (
      <div className={className}>{this.state.msg || items}</div>
    )
  }
})

export default CheckboxGroup
