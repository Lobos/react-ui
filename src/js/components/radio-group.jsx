var React = require('react')
var Radio = require('./radio.jsx')

var Classable = require('../mixins/classable')
var Resourceable = require('../mixins/resourceable')

var RadioGroup = React.createClass({
  mixins: [Classable, Resourceable],

  getInitialState: function () {
    return {
      data: [],
      value: this.props.value
    }
  },

  handleChange: function (value) {
    this.setState({ value: value })
    var change = this.props.onChange
    if (change)
      setTimeout(function () {
        change(value)
      }, 0)
  },

  getValue: function () {
    return this.state.value
  },

  render: function () {
    var className = this.getClasses(
      'checkbox-group',
      {
        'inline': this.props.inline
      }
    )
    var items = this.state.data.map(function (item, i) {
      return (
        <Radio key={i} onClick={this.handleChange} checked={this.state.value === item.value} text={item.text} value={item.value} />
      )
    }.bind(this))

    return (
      <div className={className}>{items}</div>
    )
  }
})

module.exports = RadioGroup
