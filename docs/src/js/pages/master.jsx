"use strict";

var React = require("react");
var RouteHandler = require('react-router').RouteHandler;
var NavList = require('../nav-list.jsx');

module.exports = React.createClass({
  displayName: 'Master',

  render: function () {
    return (
      <div>
        <NavList />
        <RouteHandler />
      </div>
    );
  }
});

