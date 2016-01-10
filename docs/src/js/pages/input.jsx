'use strict';

import React from 'react';
import Code from '../Code';

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
type={string}        // text, email, alpha, alphanum, password, url, textarea, number, integer
placeholder={string} // 占位提示文字
readOnly={bool}      // 只读，默认为 false
rows={int}           // 当 type 为 textarea 时需要设置
onChange={func}      // 值改变回调事件，参数为 value
value={string}       // 初始值
/>`}
        </Code>

        <p>示例见 <a href="#/formControl">FormControl</a></p>
      </div>
    </div>
  );
}
