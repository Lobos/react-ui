"use strict";

import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import prettify from '../prettify';
const {Datetime} = global.uiRequire();

class Page extends Component {
  handleChange (ref) {
    var value = 'value：' + this.refs['d-' + ref].getValue();
    findDOMNode(this.refs['p-' + ref]).innerHTML = value;
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Datetime</h1>
          <h2>日期 / 时间 选择器</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Datetime
  dateOnly={bool}       // 只选择日期部分，默认为 false
  timeOnly={bool}       // 只选择时间部分，默认为 false
  readOnly={bool}       // 只读，默认为 false
  format={string}       // 返回值格式，如 'yyyy-MM-dd'，默认值 在 Lang.date.format 下设置
  unixtime={bool}       // 为 true 时，getValue 返回 unixtimestamp
  placeholder={string}  // 占位提示文字
  onChange={function}   // 值改变时触发事件，参数为 value
  value={string|number} // 初始值
/>`}
          </pre>

          <h2 className="subhead">Example</h2>
          <Datetime ref="d-def" onChange={this.handleChange.bind(this, 'def')} value="2015-06-21 17:24:03" />
          <div ref="p-def"></div>
          <pre className="prettyprint">{`<Datetime value="2015-06-21 17:24:03" />`}</pre>

          <h2 className="subhead">dateOnly</h2>
          <Datetime ref="d-dateOnly" onChange={this.handleChange.bind(this, 'dateOnly')} dateOnly={true} />
          <div ref="p-dateOnly"></div>
          <pre className="prettyprint">{`<Datetime dateOnly={true} />`}</pre>

          <h2 className="subhead">timeOnly</h2>
          <Datetime ref="d-timeOnly" onChange={this.handleChange.bind(this, 'timeOnly')} timeOnly={true} />
          <div ref="p-timeOnly"></div>
          <pre className="prettyprint">{`<Datetime timeOnly={true} />`}</pre>

          <h2 className="subhead">readOnly</h2>
          <Datetime readOnly={true} value="2015-06-21 17:24:03" />
          <pre className="prettyprint">{`<Datetime readOnly={true} value="2015-06-21 17:24:03" />`}</pre>

          <h2 className="subhead">unixtime</h2>
          <Datetime ref="d-unixtime" onChange={this.handleChange.bind(this, 'unixtime')} unixtime={true} />
          <div ref="p-unixtime"></div>
          <pre className="prettyprint">{`<Datetime unixtime={true} />`}</pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
