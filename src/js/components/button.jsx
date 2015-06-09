"use strict";

var React = require('react');
var Classable = require('../mixins/classable');

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    children: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    once: React.PropTypes.bool,
    status: React.PropTypes.string,
    type: React.PropTypes.oneOf(['submit', 'button'])
  },

  mixins: [Classable],

  getInitialState: function () {
    return {
      disabled: this.props.disabled,
      show: null
    };
  },

  disable: function (elem) {
    this.setState({ disabled: true, show: elem });
  },

  enable: function (elem) {
    this.setState({ disabled: false, show: elem });
  },

  handleClick: function () {
    if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.props.once) {
      this.disable();
    }
  },

  render: function () {
    var status = this.props.status;
    if (status) {
      status = 'button-' + status;
    }
    var className = this.getClasses(
      'pure-button',
      status,
      { 'pure-button-primary': status === 'button-primary' },
      'button-extend'
    );

    // use function disable argument first
    var show = this.state.show || this.props.children;

    return (
      <button onClick={this.handleClick} disabled={this.state.disabled} className={className} type={this.props.type || "button"}>{show}</button>
    );
  }
});

