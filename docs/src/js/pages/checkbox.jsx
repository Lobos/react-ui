"use strict";

var React = require('react');
var Prettify = require('../mixins/prettify');
var Checkbox = require('../../../../src/js/components/checkbox.jsx');

module.exports = React.createClass({
  displayName: 'Pages/Checkbox',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox</h1>
          <h2>复选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">{'<Checkbox text="string" value={any} checked={bool} readOnly={bool} onChange={function} />'}</pre>

          <p><b>text:</b>显示的文字信息</p>
          <p><b>value:</b>值，不填写 <em>getValue</em> 得到的值为 <em>bool</em></p>
          <p><b>checked:</b>是否选中，默认为 <em>false</em></p>
          <p><b>readOnly:</b>是否只读，默认为 <em>false</em></p>
          <p><b>onChange:</b>状态改变触发事件</p>

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
});
