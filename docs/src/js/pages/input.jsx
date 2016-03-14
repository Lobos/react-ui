'use strict';

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const { Input } = global.uiRequire();

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Input</h1>
        <h2>输入框</h2>
      </div>

      <div className="content">
        <Code>
{`<Input
id={string}
type={string}        // text, email, alpha, alphanum, password, url, number, integer
placeholder={string} // 占位提示文字
readOnly={bool}      // 只读，默认为 false
onChange={func}      // 值改变回调事件，参数为 value
value={string}       // 初始值
grid={{width, offset, responsive}} // 宽度，详见Grid
/>`}
        </Code>
        <div>0.6 textarea 不再包含在Input中</div>

        <h2 className="subhead">Example</h2>
        <Example>
<Input grid={1/4} placeholder="基础文本" /><br />
<Input type="integer" grid={1/6} placeholder="integer" /><br />
<Input readOnly grid={1/4} placeholder="readOnly" /><br />
<Input value="init value" grid={1/4} placeholder="none" />
        </Example>

        <p>更多示例见 <a href="#/formControl">FormControl</a></p>
      </div>
    </div>
  );
}
