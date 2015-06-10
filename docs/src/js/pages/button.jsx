"use strict";

var React = require('react');
var Prettify = require('../mixins/prettify');
var Button = require('../../../../src/js/components/button.jsx');
var Icon = require('../../../../src/js/components/icon.jsx');

module.exports = React.createClass({
  displayName: 'Pages/Button',

  mixins: [Prettify],

  disableExample: function (event) {
    var button = this.refs.button;
    if (event.target.checked) {
      button.disable(<span><Icon icon="lock" />我被禁用了</span>);
    } else {
      button.enable('我又可以使用了');
    }
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Button</h1>
          <h2>按钮</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">{'<Button type="submit|button" disabled={bool} once={bool} status="string" onClick={function}>\r {string|element}\r</Button>'}</pre>
          <p><b>type:</b> 按钮类型，可选值为 <em>submit|button</em> ，不填默认值为 <em>button</em></p>
          <p><b>status:</b> 按钮类别，会为按钮添加 <em>pure-button-[status]</em> 的className，purecss包含 <em>primary</em> 这个值，可自行扩展 <em>success|error</em> 等</p>
          <p><b>once:</b> 值为 <em>true</em> 时，当button点击过后，状态会变更为 <em>disabled</em> ，必须调用 <em>enable</em> 方法激活才能再次使用。默认值为 <em>false</em></p>
          <p><b>disabled:</b> 与 button 的 <em>disabled</em> 属性相同</p>
          <p><b>onClick:</b> 点击事件</p>

          <h2 className="subhead">普通按钮</h2>
          <p>
            <Button status="primary">Primary Button</Button>{' '}
            <Button>Button</Button>
          </p>

<pre className="prettyprint">{'\
<Button status="primary">Primary Button</Button>\r\
<Button>Button</Button>'}
</pre>

          <h2 className="subhead">带图标按钮</h2>
          <p>
            <Button><Icon icon="home" /> Home</Button>{' '}
            <Button><Icon icon="cog" /> Settings</Button>
          </p>
          <pre className="prettyprint">{'<Button><Icon icon="home" /> Home</Button>\r<Button><Icon icon="cog" /> Settings</Button>'}</pre>

          <h2 className="subhead">扩展</h2>
          <p>Button 默认会添加 <em>button-extend</em> 类，如果需要给所有Button添加样式（如圆角，更改padding等），定义 <em>button-extend</em> 即可。</p>
          <p><em>注意：本文档里的按钮受 <em>button-extend</em> 影响，圆角已改变，purecss圆角只有2像素</em></p>
<pre className="prettyprint">{'\
.button-extend {\r\
  border-radius: 4px;\r\
}\r\
.button-success, .button-error, .button-warning, .button-info {\r\
  color: #fff;\r\
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\r\
}\r\
.button-success {\r\
  background: rgb(28, 184, 65);\r\
}\r\
.button-error {\r\
  background: rgb(202, 60, 60);\r\
}\r\
.button-warning {\r\
  background: rgb(223, 117, 20);\r\
}\r\
.button-info {\r\
  background: rgb(66, 184, 221);\r\
}\r\
.button-large {\r\
  font-size: 120%;\r\
}'}</pre>

          <p>
            <Button status="success">Success Button</Button>{' '}
            <Button status="warning">Warning Button</Button>{' '}
            <Button status="error">Error Button</Button>{' '}
            <Button status="info">Info Button</Button><br />
          </p>

<pre className="prettyprint">{'\
<Button status="success">Success Button</Button>\r\
<Button status="warning">Warning Button</Button>\r\
<Button status="error">Error Button</Button>\r\
<Button status="info">Info Button</Button>'}
</pre>
          <p>也可以直接添加className</p>
          <p>
            <Button className="button-large">Large Button</Button>
          </p>
          <pre className="prettyprint">{'<Button className="large-button">Large Button</Button>'}</pre>

          <h2 className="subhead">once</h2>
          <p>
            <Button once={true}>只能点击一次</Button>
          </p>
          <pre className="prettyprint">{'<Button once={true}>只能点击一次</Button>'}</pre>

          <h2 className="subhead">enable(elem)/disabled(elem)</h2>
          <p>两个实例方法 <em>enable</em>（启用） 和 <em>disable</em> （禁用），可以传入一个参数（字符串或者element）替换按钮内容</p>
          <p>
            <Button ref="button">Button</Button>{' '}
            <label className="pure-checkbox">
              <input onClick={this.disableExample} type="checkbox" /> 禁用
            </label>
          </p>

<pre className="prettyprint">{'\
<Button ref="button">Button</Button>\r\
<label className="pure-checkbox">\r\
  <input onClick={this.disableExample} type="checkbox" /> 禁用\r\
</label>'}
</pre>
<pre className="prettyprint">{'\
disableExample: function (event) {\r\
  var button = this.refs.button;\r\
  if (event.target.checked) {\r\
    button.disable(<span><Icon icon="lock" />我被禁用了</span>);\r\
  } else {\r\
    button.enable("我又可以使用了");\r\
  }\r\
}'}
</pre>

        </div>
      </div>
    );
  }
});
