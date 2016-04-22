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
  onChange={func}      // 回调方法，实际是由trigger指定的事件触发，非change事件
  trigger={string}     // 触发数据校验和回填form的事件，可选值为 blur|change|keyDown|keyUp，默认为blur
  value={string}       // 初始值
  grid={{width, offset, responsive}} // 宽度，详见Grid
/>`}
        </Code>
        <div>0.6 textarea 不再包含在Input中</div>

        <h2 className="subhead">onChange(value, event)</h2>
        <div>onChagne的回调参数，第一个参数是value，第二参数是event</div>

        <h2 className="subhead">Example</h2>
        <Example>
<Input grid={1/4} placeholder="基础文本" /><br />
<Input type="integer" grid={1/6} placeholder="integer" /><br />
<Input readOnly grid={1/4} placeholder="readOnly" /><br />
<Input value="init value" grid={1/4} onChange={(value) => console.log(value)} placeholder="none" /><br />
<Input value="change trigger" trigger="change" onChange={(value) => console.log(value)} grid={1/3} />
        </Example>

        <p>更多示例见 <a href="#/formControl">FormControl</a></p>
      </div>
    </div>
  );
}
