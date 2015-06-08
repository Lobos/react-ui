"use strict";

require('../../../node_modules/purecss/build/buttons.css');

var React = require('react');
var Classable = require('../mixins/classable');

module.exports = React.createClass({
  displayName: 'Button',

  propTypes: {
    children: React.PropTypes.any,
    onClick: React.PropTypes.func,
    status: React.PropTypes.string,
    type: React.PropTypes.oneOf(['submit', 'button'])
  },

  mixins: [Classable],

  handleClick: function () {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render: function () {
    var status = this.props.status;
    if (status) {
      status = 'pure-button-' + status;
    }
    var className = this.getClasses('pure-button', status, 'pure-button-extend');

    return (
      <button onClick={this.handleClick} className={className} type={this.props.type || "button"}>{this.props.children}</button>
    );
  }
});

