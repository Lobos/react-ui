var React = require('react')

var Radio = React.createClass({
  handleClick: function () {
    if (this.props.onClick)
      this.props.onClick(this.props.value, this.props.index)
  },

  // ignore react readonly warning
  noop: function () {},

  render: function () {
    return (
      <div className="radio">
        <label>
          <input ref="input" type="radio" readOnly={this.props.readOnly} onChange={this.noop} onClick={this.handleClick} checked={this.props.checked} value={this.props.value} />
          {this.props.text}
        </label>
      </div>
    )
  }
})

module.exports = Radio
