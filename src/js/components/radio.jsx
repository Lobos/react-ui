"use strict"

require('../../less/checkbox.less')
let React = require('react')

module.exports = React.createClass({
  displayName: "Radio",

  propTypes: {
    checked: React.PropTypes.bool,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    text: React.PropTypes.any,
    value: React.PropTypes.any
  },

  handleClick: function () {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, this.props.index)
    }
  },

  render: function () {
    return (
      <div className="pure-radio rui-radio">
        <label>
          <input ref="input"
            type="radio"
            disabled={this.props.readOnly}
            onChange={() => {}}
            onClick={this.handleClick}
            checked={this.props.checked}
            value={this.props.value}
          />
          {this.props.text}
        </label>
      </div>
    )
  }
})
