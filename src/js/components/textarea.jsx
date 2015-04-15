var React = require('react')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var TextArea = React.createClass({
  mixins: [Classable, ReceiveValue],

  handleChange: function (event) {
    var value = event.target.value
    this.setState({value: value})
    if (this.props.onChange)
      this.props.onChange(value)
  },

  getValue: function () {
    return this.state.value
  },

  render: function () {
    var className = this.getClasses()
    return (
      <textarea readOnly={this.props.readOnly} 
        placeholder={this.props.placeholder}
        className={className} 
        rows={this.props.rows || 4}
        onChange={this.handleChange} 
        value={this.state.value} />
    )
  }
})

module.exports = TextArea
