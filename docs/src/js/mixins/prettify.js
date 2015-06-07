"use strict";

var React = require('react');

module.exports = {
  componentDidMount: function () {
    var node = React.findDOMNode(this);
    window.prettyPrint(null, node);
  }
};
