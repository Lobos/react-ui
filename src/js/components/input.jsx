var React = require('react')
var Classable = require('../mixins/classable')

var Input = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      value: this.props.value
    }
  },

  handleChange: function (event) {
    if (this.props.onChange)
      this.props.onChange(event.target.value)
  },

  getValue: function () {
    return React.findDOMNode(this).value
  },

  render: function () {
    var className = this.getClasses()
    return (
      <input readOnly={this.props.readOnly} 
        className={className} 
        onChange={this.handleChange} 
        value={this.state.value} />
    )
  }
})

module.exports = Input
