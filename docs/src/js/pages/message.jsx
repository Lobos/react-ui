"use strict";

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Message, Icon} = global.uiRequire();

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Message</h1>
        <h2>通知 / 消息</h2>
      </div>

      <div className="content">
        <h2 className="subhead">全局方法</h2>
        <Code>{'Message.show(content, type)'}</Code>
        <p><b>content:</b>内容，必填，值为 <em>string</em> 或 <em>element</em></p>
        <p><b>type:</b>样式，会增加一个class <em>messsage-[type]</em>，默认值为 <em>info</em></p>

        <h2 className="subhead">Example</h2>
        <Example>
<a onClick={() => Message.show("Info message.")}>info message</a>
        </Example>

        <Example>
<a onClick={() => Message.show("error message.", "error")}>error message</a>
        </Example>

        <Example>
<a onClick={() => Message.show(<div><h3>title</h3><span>span message</span></div>, "warning")}>element message</a>
        </Example>

        <Example>
<a onClick={() => Message.show(<span><Icon icon="music" /> success and icon</span>, "success")}>success message</a>
        </Example>
      </div>
    </div>
  );
}
