var React = require('react')
var Checkbox = require('./checkbox.jsx')

var Strings = require('../utils/strings')
var Classable = require('../mixins/classable')
var Resourceable = require('../mixins/resourceable')

var CheckboxGroup = React.createClass({
  mixins: [Classable, Resourceable],

  getInitialState: function () {
    return {
      data: [],
      value: Strings.formatValue(this.props.value, this.props.flat)
    }
  },

  handleChange: function (checked, value) {
    if ('string' !== typeof value) value = value.toString()

    var values = this.state.value
    if (checked) {
      values.push(value)
    } else {
      var i = values.indexOf(value)
      if (i >= 0) values.splice(i, 1)
    }

    if (this.props.onChange)
      this.props.onChange(values)

    this.setState({ value: values })
  },

  getValue: function () {
    var value = this.state.value
    if (this.props.flat)
      value = value.join(',')
    return value
  },

  setValue: function (value) {
    this.setState({value: Strings.formatValue(value)})
  },

  render: function () {
    var className = this.getClasses(
      'checkbox-group',
      {
        'inline': this.props.inline
      }
    )
    var values = this.state.value
    var items = this.state.data.map(function (item, i) {
      var value = this.flat ? item.value.toString() : item.value
      var checked = values.indexOf(value) >= 0
      return (
        <Checkbox key={i} index={i} checked={checked} onChange={this.handleChange} text={item.text} value={item.value} />
      )
    }, this)

    return (
      <div className={className}>{items}</div>
    )
  }
})

module.exports = CheckboxGroup
