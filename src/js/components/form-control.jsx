var React = require('react')
var classnames = require('classnames')

var Checkbox = require('./checkbox.jsx')
var CheckboxGroup = require('./checkbox-group.jsx')
var Datetime = require('./datetime.jsx')
var RadioGroup = require('./radio-group.jsx')
var Input = require('./input.jsx')
var Select = require('./select.jsx')
var MultSelect = require('./mult-select.jsx')
var TextArea = require('./textarea.jsx')
var Tree = require('./tree.jsx')
var Rating = require('./rating.jsx')
var Progress = require('./progress.jsx')
var ColorPicker = require('./color-picker.jsx')

var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')
var Validatable = require('../mixins/validatable')


var Control = React.createClass({
  mixins: [Classable, Validatable],

  propTypes: {
    name: React.PropTypes.string.isRequired 
  },

  getInitialState: function () {
    return {
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      hintText: '',
      labelWidth: this.props.labelWidth || 2,
      width: 0,
    }
  },

  componentWillMount: function () {
    this.setWidth()
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value)
      this.validate(nextProps.value)
    }
  },

  setWidth: function () {
    var labelWidth = this.props.labelWidth || 2,
        width = this.props.width || 12
    if (labelWidth + width > 12)
      width = 12 - labelWidth
    this.setState({
      labelWidth: labelWidth,
      width: width
    })
  },

  handleChange: function (value) {
    if (this.props.onChange)
      this.props.onChange(value)
    this.validate(value)
  },

  getValue: function (raw) {
    return this.refs.control.getValue(raw)
  },

  setValue: function (value) {
    if (this.refs.control.setValue)
      this.refs.control.setValue(value)
    this.validate(value)
    this.setState({ hasValue: !Objects.isEmpty(value) })
  },

  getLabel: function () {
    var className
    if ('horizontal' === this.props.layout) {
      className = 'control-label col-sm-' + (this.state.labelWidth)
    }

    var label = <label className={className}>{this.props.label}</label>
    return label
  },

  getHint: function () {
    var text = (this.state.hasValue && !this.props.showHint) ? "" : this.state.hintText
    if (this.state.hasError) {
      text = this.state.errorText
    }

    if (this.props.layout === 'inline' || !text)
      return null

    var className = "help-block"
    if ('horizontal' === this.props.layout) {
      var width = 12 - this.state.labelWidth
      className = classnames(className, "col-sm-offset-" + this.state.labelWidth, "col-sm-" + width)
    }

    return <p className={className}>{text}</p>
  },

  getControl: function () {
    var control
    switch (this.props.type) {
      case 'checkbox':
        control = <Checkbox checked={this.state.value === true || this.state.value === 1} {...this.copyProps()} />
      break
      case 'checkbox-group':
        control = <CheckboxGroup {...this.copyProps()} />
      break
      case 'datetime':
        control = <Datetime className="form-control" {...this.copyProps()} />
      break
      case 'progress':
        control = <Progress {...this.copyProps()} />
      break
      case 'radio-group':
        control = <RadioGroup {...this.copyProps()} />
      break
      case 'select':
        control = <Select className="form-control" {...this.copyProps()} />
      break
      case 'mult-select':
        control = <MultSelect className="form-control" {...this.copyProps()} />
      break
      case 'tree':
        control = <Tree {...this.copyProps()} />
      break
      case 'rating':
        control = <Rating {...this.copyProps()} />
      break
      case 'textarea':
        control = <TextArea className="form-control" {...this.copyProps()} />
      break
      case 'hex':
      case 'rgb':
      case 'rgba':
      case 'hsv':
        control = <ColorPicker {...this.copyProps()} />
      break
      default:
        control = <Input className="form-control" {...this.copyProps()} />
      break
    }

    if ('horizontal' === this.props.layout) {
      control = <div className={'col-sm-' + this.state.width}>{control}</div>
    }
    
    return control
  },

  copyProps: function () {
    var keys = [
      'checked',
      'checkAble',
      'checkKey',
      'data',
      'dateOnly',
      'fixed',
      'flat',
      'greedy',
      'inline',
      'minValue',
      'maxValue',
      'open',
      'placeholder', 
      'readOnly',
      'rows',
      'single',
      'size',
      'src',
      'style',
      'text',
      'theme',
      'timeOnly',
      'type',
      'unit',
      'unixtime',
    ]

    var props = { 
      ref: "control",
      value: this.state.value,
      onChange: this.handleChange,
    }

    keys.forEach(function (key) {
      if (this.props.hasOwnProperty(key))
        props[key] = this.props[key]
    }.bind(this))
    return props
  },

  render: function () {
    var className = this.getClasses(
      "form-group", 
      {
        "has-error": this.state.hasError
      }
    )

    return (
      <div className={className}>
        {this.getLabel()}
        {this.getControl()}
        {this.getHint()}
      </div>
    )
  }
})

module.exports = Control
