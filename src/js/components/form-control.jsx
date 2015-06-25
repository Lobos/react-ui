"use strict"

let React = require('react')
let classnames = require('classnames')
let Strings = require('../utils/strings')
let clone = require('../utils/clone')
let Validatable = require('../mixins/validatable')

let renders = {}
// array, string, number
let valueTypes = {}

let FormControl = React.createClass({
  displayName: 'FormControl',

  propTypes: {
    className: React.PropTypes.string,
    data: React.PropTypes.any,
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },

  mixins: [Validatable],

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
    // do not use Classable, cause width will set control width
    // if want to set group's width, use className
    let className = classnames(
      this.props.className,
      'pure-control-group',
      {
        hasError: this.state.hasError
      }
    )

    return (
      <div className={className}>
        <label htmlFor={this.state.id}>{this.props.label}</label>
        <div className="pure-control-inner">
          {this.getControl()}
          <span className="hint">{this.state.hintText}</span>
          <span className="error">{this.state.errorText}</span>
        </div>
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
