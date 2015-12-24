"use strict";

import React from 'react';
import prettify from '../prettify';
const {Message, Icon} = global.uiRequire();

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Message</h1>
          <h2>通知 / 消息</h2>
        </div>

        <div className="content">
          <h2 className="subhead">全局方法</h2>
<pre className="prettyprint">{'Message.show(content, type)'}</pre>
          <p><b>content:</b>内容，必填，值为 <em>string</em> 或 <em>element</em></p>
          <p><b>type:</b>样式，会增加一个class <em>messsage-[type]</em>，默认值为 <em>info</em></p>

          <h2 className="subhead">Example</h2>
          <p><a onClick={() => Message.show("Info message.")}>info message</a></p>
          <pre className="prettyprint">{'Message.show("info message.")'}</pre>

          <p><a onClick={() => Message.show("error message.", "error")}>error message</a></p>
          <pre className="prettyprint">{'Message.show("error message.", "error")'}</pre>

          <p><a onClick={() => Message.show(<div><h3>title</h3><span>span message</span></div>, "warning")}>element message</a></p>
          <pre className="prettyprint">{'Message.show(<div><h3>title</h3><span>span message</span></div>, "warning")'}</pre>

          <p><a onClick={() => Message.show(<span><Icon icon="music" /> success and icon</span>, "success")}>success message</a></p>
          <pre className="prettyprint">{'Message.success(<span><Icon icon="music" /> success and icon</span>, "success")'}</pre>

          <h2 className="subhead">扩展</h2>
          <p>默认会添加 <em>message-extend</em> 类，可以通过这个类进行扩展。</p>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
