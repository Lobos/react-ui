var React = require('react')
var Classable = require('../mixins/classable')

var TextArea = React.createClass({
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
      <textarea readOnly={this.props.readOnly} 
        placeholder={this.props.placeholder}
        className={className} 
        rows={this.props.rows || 4}
        onChange={this.handleChange}>
        {this.state.value}
      </textarea>
    )
  }
})

module.exports = TextArea
