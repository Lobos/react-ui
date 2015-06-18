"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
import {Message, Icon} from '../../../../src/js/'

module.exports = React.createClass({
  displayName: 'Pages/Message',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Message</h1>
          <h2>通知 / 消息</h2>
        </div>

        <div className="content">
          <p>为了实现全局通知，使用了Reflux，需要加入Reflux引用。</p>
          <p>首先，在页面的某个地方，加入一个<em>Message Compontent</em></p>
          <pre className="prettyprint">{'<Message top={bool} clickaway={bool} />'}</pre>
          <p><b>top:</b>显示位置，为 <em>true</em> 时显示在页面顶部， <em>false</em> 显示在页面左下角</p>
          <p><b>clickaway:</b>为 <em>true</em> 时，点击页面空白处关闭所有消息</p>

          <h2 className="subhead">全局方法</h2>
<pre className="prettyprint">{'Message.show(content, type)'}</pre>
          <p><b>content:</b>内容，必填，值为 <em>string</em> 或 <em>element</em></p>
          <p><b>type:</b>样式，会增加一个class <em>messsage-[type]</em>，默认值为 <em>info</em></p>

          <h2 className="subhead">Example</h2>
          <p><a onClick={Message.show.bind(null, "Info message.")}>info message</a></p>
          <pre className="prettyprint">{'Message.show("info message.")'}</pre>

          <p><a onClick={Message.show.bind(null, "error message.", "error")}>error message</a></p>
          <pre className="prettyprint">{'Message.error("error message.", "error")'}</pre>

          <p><a onClick={Message.show.bind(null, <div><h3>title</h3><span>span message</span></div>, "warn")}>element message</a></p>
          <pre className="prettyprint">{'Message.warn(<span>warning and span</span>, "title")'}</pre>

          <p><a onClick={Message.show.bind(null, <span><Icon icon="music" /> success and icon</span>, "success")}>success message</a></p>
          <pre className="prettyprint">{'Message.success(<span><Icon icon="music" /> success and icon</span>, "title")'}</pre>

          <h2 className="subhead">扩展</h2>
          <p>默认会添加 <em>message-extend</em> 类，可以通过这个类进行扩展。</p>
        </div>
      </div>
    )
  }
})
