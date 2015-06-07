"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName: 'Home',

  render: function () {
    return (
      <div>
        <div className="hero">
          <div className="hero-title">
            <h1>React UI</h1>
            <h2>React组件库，样式基于yahoo的<a href="http://purecss.io/">purecss</a>。</h2>
          </div>
        </div>
      </div>
    );
  }
});
