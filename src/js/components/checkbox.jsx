"use strict"

require('../../less/checkbox.less')
let React = require('react')

module.exports = React.createClass({
  displayName: "Checkbox",

  propTypes: {
    checked: React.PropTypes.bool,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    text: React.PropTypes.text,
    value: React.PropTypes.any
  },

  getInitialState: function () {
    return {
      checked: !!this.props.checked
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked })
    }
  },

  handleChange: function (event) {
    if (this.props.readOnly) {
      return
    }

    this.setState({ checked: event.target.checked })
    if (this.props.onChange) {
      this.props.onChange(event.target.checked, this.props.value, this.props.index)
    }
  },

  getValue: function () {
    return React.findDOMNode(this.refs.input).checked ? (this.props.value || true) : false
  },

  setValue: function (value) {
    var checked = value === true || value === 1 || value === this.state.value
    this.setState({ checked: checked })
  },

  render: function () {
    return (
      <label className="pure-checkbox rui-checkbox">
        <input ref="input"
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.checked}
          value={this.props.value}
        />
        {` ${this.props.text}`}
      </label>
    )
  }
})
