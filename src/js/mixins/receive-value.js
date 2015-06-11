"use strict";

module.exports = {
  getInitialState: function () {
    return {
      value: this.$formatValue(this.props.value)
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: this.$formatValue(nextProps.value) });
    }
  },

  setValue: function (value) {
    value = this.$formatValue(value);
    this.setState({ value: value });
  },

  $formatValue: function (value) {
    if (this.formatValue) {
      value = this.formatValue(value);
    }
    return value;
  }
};
