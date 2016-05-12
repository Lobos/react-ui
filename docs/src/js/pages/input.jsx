'use strict';

import React from 'react';
import Code from '../Code';
import Example from '../Example';
import { En, Cn } from '../Language';
const { Input } = global.uiRequire();

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Input</h1>
        <Cn><h2>输入框</h2></Cn>
      </div>

      <div className="content">
        <Code>
{`<Input
  id={string}
  type={string}        // text, email, alpha, alphanum, password, url, number, integer
  placeholder={string}
  readOnly={bool}      // == disabled
  onChange={func}      // 回调方法，实际是由trigger指定的事件触发，非change事件
  size="string"        // 'large|middle|small', default value is 'middle'
  trigger={string}     // 触发数据校验和回填form的事件，可选值为 blur|change|keyDown|keyUp，默认为blur
  value={string}       // 初始值
  grid={{width, offset, responsive}} // 宽度，详见Grid
/>`}
        </Code>
        <Cn>0.6 textarea 不再包含在Input中</Cn>

        <h2 className="subhead">onChange(value, event)</h2>
        <Cn>onChagne的回调参数，第一个参数是value，第二参数是event</Cn>
        <En>first argument is value, second is event.</En>

        <h2 className="subhead">Example</h2>
        <Example>
<Input grid={1/4} placeholder="text" /><br />
<Input type="integer" grid={1/6} placeholder="integer" /><br />
<Input readOnly grid={1/4} placeholder="readOnly" /><br />
<Input value="init value" grid={1/4} onChange={(value) => console.log(value)} placeholder="none" /><br />
<Input value="change trigger" trigger="change" onChange={(value) => console.log(value)} grid={1/3} />
        </Example>

        <h2 className="subhead">Size</h2>
        <Example>
<Input grid={1/4} size="small" placeholder="small" />
<Input grid={1/4} placeholder="middle" />
<Input grid={1/4} size="large" placeholder="large" />
        </Example>
        <p>更多示例见 <a href="#/formControl">FormControl</a></p>
      </div>
    </div>
  );
}
