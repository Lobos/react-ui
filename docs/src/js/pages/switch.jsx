"use strict";

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Switch} = global.uiRequire();

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Switch</h1>
        </div>

        <div className="content">

          <Code>
{`<Switch
  className={string}  // class
  checked={bool}      // 是否选中，默认为 false
  onChange={function} // 状态改变回调事件
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Switch />
          </Example>
        </div>
      </div>
    );
  }
}
