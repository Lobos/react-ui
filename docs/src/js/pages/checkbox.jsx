"use strict";

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Checkbox} = global.uiRequire();

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox</h1>
          <h2>复选框</h2>
        </div>

        <div className="content">

          <Code>
{`<Checkbox
  className={string}  // class
  text="string"       // 显示的文字信息
  value={any}         // 值，不填写 getValue 得到的值为 bool
  checked={bool}      // 是否选中，默认为 false
  readOnly={bool}     // 是否只读，默认为 false
  onChange={function} // 状态改变回调事件
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Checkbox text="checkbox" />
          </Example>

          <h2 className="subhead">Readonly</h2>
          <Example>
<Checkbox checked={true} readOnly={true} text="readonly checkbox" />
          </Example>
        </div>
      </div>
    );
  }
}
