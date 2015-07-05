"use strict"

let React = require('react')
let classnames = require('classnames')
let deepmerge = require('deepmerge')
let Strings = require('../utils/strings')
let Objects = require('../utils/objects')
let Validatable = require('../mixins/validatable')

let controls = {}

let FormControl = React.createClass({
  displayName: 'FormControl',

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    data: React.PropTypes.any,
    hintType: React.PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    layout: React.PropTypes.oneOf(['aligned', 'stacked', 'inline']),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    responsive: React.PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    type: React.PropTypes.string,
    value: React.PropTypes.any,
    width: React.PropTypes.number
  },

  mixins: [Validatable],

  getDefaultProps: function () {
    return {
      id: Strings.nextUid(),
      layout: 'inline',
      responsive: 'md',
      type: 'text'
    }
  },

  getInitialState: function () {
    return {
      focused: false,
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      valueType: controls[this.props.type].valueType,
      data: this.props.data,
      hintText: ''
    }
  },

  getReference: function () {
    return this.refs.control
  },

  handleChange: function (value) {
    this.validate(this.refs.control.getValue(null))
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  },

  getValue: function (sep) {
    return this.refs.control.getValue(sep)
  },

  setValue: function (value) {
    if (this.refs.control.setValue) {
      this.refs.control.setValue(value)
    }
    this.validate(value)
  },

  handleFocus: function (focused) {
    this.setState({ focused })
  },

  copyProps: function () {
    let props = {}
    Objects.forEach(this.props, (v, k) => {
      props[k] = v
    })
    props.ref = 'control'
    props.value = this.state.value
    props.onChange = this.handleChange
    props.onFocus = this.handleFocus.bind(this, true)
    props.onBlur = this.handleFocus.bind(this, false)

    if (props.layout === 'inline') {
      props.placeholder = props.placeholder || props.label
    }

    // It's important use state.data instead of props.data
    // Otherwise control.data will be refresh after setState
    props.data = this.state.data

    return props
  },

  getChildren: function (children, component) {
    if (!Array.isArray(children)) {
      children = [children]
    }
    let newChildren = []
    children.map((child, i) => {
      let props = { key: i }
      if (child.type === component) {
        props.ref = 'control'
      }
      if (child.props && typeof child.props.children === 'object') {
        props.children = this.getChildren(child.props.children, component)
      }
      child = React.addons.cloneWithProps(child, props)
      newChildren.push(child)
    })
    return newChildren
  },

  getControl: function (props) {
    let control = controls[this.props.type]
    if (!control) {
      console.warn(`${this.props.type} was not registed.`)
      return null
    }

    let children = this.props.children
    if (children) {
      return this.getChildren(children, control.component)
    } else {
      props = deepmerge(this.copyProps(), props || {})
      return control.render(props)
    }
  },

  renderInline: function (className) {
    if (this.props.width) {
      className = `${className} pure-u-1 pure-u-${this.props.responsive}-${this.props.width}-24`
    }
    return (
      <div className={className}>
        {this.getControl({ width: this.props.width ? 24 : undefined })}
        {
          this.state.errorText ?
          <span className="error">{this.state.errorText}</span> :
          ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
        }
      </div>
    )
  },

  renderStacked: function (className) {
    return (
      <div className={className}>
        <label className="label" htmlFor={this.props.id}>{this.props.label}</label>
        <div className="pure-control-inner">
          {this.getControl()}
          {
            this.state.errorText ?
            <span className="error">{this.state.errorText}</span> :
            ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
          }
        </div>
      </div>
    )
  },

  render: function () {
    // do not use Classable, cause width will set control width
    // if want to set group's width, use className
    let hintType = this.props.hintType ?
                   this.props.hintType :
                   ( this.props.layout === 'inline' ? 'pop' : 'block' )
    let className = classnames(
      this.props.className,
      'pure-control-group',
      `hint-${hintType}`,
      {
        'has-error': this.state.hasError,
        'focused': this.state.focused
      }
    )

    if (this.props.layout === 'inline') {
      return this.renderInline(className)
    } else {
      return this.renderStacked(className)
    }
  }
})

// register component
FormControl.register = function (types, render, component, valueType = 'string') {
  if (typeof types === 'string') {
    types = [types]
  }
  types.forEach(type => {
    controls[type] = { render, component, valueType }
  })
}

module.exports = FormControl
