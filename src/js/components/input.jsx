var React = require('react')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var Input = React.createClass({
  mixins: [Classable, ReceiveValue],

  handleChange: function (event) {
    var value = event.target.value
    this.setState({ value: value })
    if (this.props.onChange)
      this.props.onChange(value)
  },

  getValue: function () {
    return this.state.value
  },

  render: function () {
    var className = this.getClasses()
    return (
      <input readOnly={this.props.readOnly} 
        placeholder={this.props.placeholder}
        type="text"
        className={className} 
        onChange={this.handleChange} 
        value={this.state.value} />
    )
  }
})

module.exports = Input
