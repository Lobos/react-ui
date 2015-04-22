module.exports = {
  getInitialState: function () {
    return {
      value: this._formatValue(this.props.value)
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: this._formatValue(nextProps.value) })
    }
  },

  setValue: function (value) {
    value = this._formatValue(value)
    this.setState({ value: value })
  },

  _formatValue: function (value) {
    if (this.formatValue)
      value = this.formatValue(value)
    return value
  }
}
