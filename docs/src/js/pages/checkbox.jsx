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
  block={bool}        // 为 true 时，diplay=block。默认为 false
  className={string}  // class
  checkValue          // deprecated!!!
  defaultValue={any}  // 选中后得到的值，默认值为 true
  text="string"       // 显示的文字信息
  value={any}         // 传入校验是否选中的值，只用来做校验，选中后实际返回值是defaultValue
  checked={bool}      // 是否选中，默认为 false
  readOnly={bool}     // 是否只读，默认为 false
  onChange={function} // 状态改变回调事件
/>`}
          </Code>
          <p>
            0.7 使用defaultValue替换checkValue，作用完全一样。<br />
            0.7 移除内部state，变为dumb组件
          </p>

          <h2 className="subhead">Example</h2>
          <Example>
<Checkbox text="checkbox" defaultValue="1" />
          </Example>

          <h2 className="subhead">Readonly</h2>
          <Example>
<Checkbox checked={true} readOnly={true} text="readonly checkbox" />
<Checkbox readOnly={true} text="readonly checkbox" />
          </Example>
        </div>
      </div>
    );
  }
}
