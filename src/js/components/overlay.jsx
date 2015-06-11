"use strict";

require('../../less/overlay.less');
var React = require('react');
var Classable = require('../mixins/classable');

function noop() {}

module.exports = React.createClass({
  displayName: 'Overlay',

  propTypes: {
    onClick: React.PropTypes.func
  },

  mixins: [Classable],

  render: function () {
    var className = this.getClasses('overlay');
    var onClick = this.props.onClick || noop;

    return (
      <div className={className} onClick={onClick} />
    );
  }
});
