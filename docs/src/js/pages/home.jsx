"use strict";

import React from 'react';
const {Icon} = global.uiRequire();

module.exports = class Home extends React.Component {
  render () {
    return (
      <div>
        <div className="hero">
          <div className="hero-title">
            <h1>React UI</h1>
            <h2>React组件库，样式基于yahoo的<a href="http://purecss.io/">purecss</a>。</h2>
            <div style={{marginTop: 40}}>
              <a className="rct-button button-large button-extend" href="https://github.com/Lobos/react-ui"><Icon icon="github" /> Github</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
