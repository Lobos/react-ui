"use strict";

import React from 'react';
import prettify from '../prettify';
const {Checkbox} = global.uiRequire();

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox</h1>
          <h2>复选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">
{`<Checkbox
  className={string}  // class
  text="string"       // 显示的文字信息
  value={any}         // 值，不填写 getValue 得到的值为 bool
  checked={bool}      // 是否选中，默认为 false
  readOnly={bool}     // 是否只读，默认为 false
  onChange={function} // 状态改变回调事件
/>`}
          </pre>

          <h2 className="subhead">Example</h2>
          <p>
            <Checkbox text="checkbox" />
          </p>
          <pre className="prettyprint">{'<Checkbox text="checkbox" />'}</pre>

          <h2 className="subhead">Readonly</h2>
          <p>
            <Checkbox checked={true} readOnly={true} text="readonly checkbox" />
          </p>
          <pre className="prettyprint">{'<Checkbox checked={true} readOnly={true} text="readonly checkbox" />'}</pre>

          <h2 className="subhead">getValue()</h2>
          <p>获取值，选中状态下如果有 <em>value</em>，返回 <em>value</em> ，否则返回 <em>true</em> ，未选中状态返回 <em>false</em></p>

          <h2 className="subhead">setValue(value)</h2>
          <p>如果 <em>value</em> 值与 <em>props.value</em> 相等，或者值为 <em>true</em> 或者 <em>1</em> ，设置为选中状态</p>

        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
