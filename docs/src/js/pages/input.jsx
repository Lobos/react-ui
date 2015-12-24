'use strict';

import React from 'react';
import prettify from '../prettify';

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Input</h1>
          <h2>输入框</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Input
  id={string}
  type={string}        // text, email, alpha, alphanum, password, url, textarea, number, integer
  placeholder={string} // 占位提示文字
  readOnly={bool}      // 只读，默认为 false
  rows={int}           // 当 type 为 textarea 时需要设置
  onChange={func}      // 值改变回调事件，参数为 value
  value={string}       // 初始值
/>`}
          </pre>

          <p>示例见 <a href="#/formControl">FormControl</a></p>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
