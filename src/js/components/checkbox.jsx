var React = require('react')

var Checkbox = React.createClass({
  handleChange: function (event) {
    if (this.props.onChange)
      this.props.onChange(event.target.checked, this.props.value, this.props.index)
  },

  getValue: function () {
    return this.refs.input.getDOMNode().checked ? (this.props.value || 'on') : null
  },

  render: function () {
    return (
      <div className="checkbox">
        <label>
          <input ref="input" type="checkbox" onChange={this.handleChange} checked={this.props.checked} value={this.props.value} />
          {this.props.text}
        </label>
      </div>
    )
  }
})

module.exports = Checkbox
