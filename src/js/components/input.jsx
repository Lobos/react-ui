var React = require('react')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')


var Input = React.createClass({
  mixins: [Classable, ReceiveValue],

  handleChange: function (event) {
    if (this.props.readOnly) return

    var value = event.target.value
    this.setState({ value: value })
    if (this.props.onChange)
      this.props.onChange(value)
  },

  getValue: function () {
    return React.findDOMNode(this).value
  },

  render: function () {
    var className = this.getClasses()

    var type = this.props.type === 'password' ? 'password' : 'text'

    return (
      <input readOnly={this.props.readOnly} 
        placeholder={this.props.placeholder}
        type={type}
        className={className} 
        onChange={this.handleChange} 
        value={this.state.value} />
    )
  }
})

module.exports = Input
