"use strict";

var React = require('react');
var menulist = require('./menulist');

module.exports = React.createClass({
  displayName: 'NavList',

  render: function () {
    var list = menulist.map(function (m) {
      return (
        <li><a>{m.text}</a></li>
      );
    });

    return (
      <div className="nav-list">
        <ul>{list}</ul>
      </div>
    );
  }
});
