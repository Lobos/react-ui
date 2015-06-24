"use strict"

let React = require('react')
let Strings = require('../utils/strings')
let clone = require('../utils/clone')
let Classable = require('../mixins/classable')
let Validatable = require('../mixins/validatable')

let renders = {}
// array, string, number
let valueTypes = {}

let FormControl = React.createClass({
  displayName: 'FormControl',

  propTypes: {
    data: React.PropTypes.any,
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },

  mixins: [Classable, Validatable],

  getDefaultProps: function () {
    return {
      type: 'text'
    }
  },

  getInitialState: function () {
    return {
      id: this.props.id || Strings.nextUid(),
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      valueType: valueTypes[this.props.type],
      data: this.props.data,
      hintText: ''
    }
  },

  handleChange: function (value) {
    this.validate(value)
    /*
    console.log(value)
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
    */
  },

  getValue: function (sep) {
    return this.refs.control.getValue(sep)
  },

  copyProps: function () {
    let props = clone(this.props)
    props.ref = 'control'
    props.value = this.state.value
    props.onChange = this.handleChange
    // It's important use state.data instead of props.data
    // Otherwise control.data will be refresh after setState
    props.data = this.state.data

    return props
  },

  getControl: function () {
    let render = renders[this.props.type]
    if (!render) {
      console.warn(`${this.props.type} was not registed.`)
      return null
    }

    return render(this.copyProps())
  },

  render: function () {
    let className = this.getClasses('pure-control-group', {
      hasError: this.state.hasError
    })

    // test
    return (
      <div className={className}>
        <label htmlFor={this.state.id}>{this.props.label}</label>
        {this.getControl()}
        <span>{this.state.hintText}</span>
      </div>
    )
  }
})

// register component
FormControl.register = function (types, render, valueType) {
  if (typeof types === 'string') {
    types = [types]
  }
  types.forEach(type => {
    renders[type] = render
    valueTypes[type] = valueType || 'string'
  })
}

module.exports = FormControl
