"use strict";

import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import prettify from '../prettify';
const {Datetime} = global.uiRequire();

class Page extends Component {
  constructor (props) {
    super(props);
    this.state = {
      min: null,
      max: null
    }
  }

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
  readOnly={bool}       // 只读，默认为 false
  format={string}       // 返回值格式，如 'yyyy-MM-dd'，默认值 在 Lang.date.format 下设置
  min={string|int|Date} // 最小值，可以为string，unixtimestamp或者Date对象
  max={string|int|Date} // 最大值，可以为string，unixtimestamp或者Date对象
  unixtime={bool}       // 为 true 时，getValue 返回 unixtimestamp
  placeholder={string}  // 占位提示文字
  onChange={function}   // 值改变时触发事件，参数为 value
  type={string}         // 可选值为 'datetime|date|time'，默认值为'datetime'
  value={string|number} // 初始值
/>`}
          </pre>
          <p style={{color:'red'}}>0.6.0 删除了 dateOnly and timeOnly，使用type="date|time"代替</p>

          <h2 className="subhead">Example</h2>
          <Datetime ref="d-def" onChange={this.handleChange.bind(this, 'def')} value="2015-06-21 17:24:03" />
          <div ref="p-def"></div>
          <pre className="prettyprint">{`<Datetime value="2015-06-21 17:24:03" />`}</pre>

          <h2 className="subhead">date</h2>
          <Datetime ref="d-dateOnly" onChange={this.handleChange.bind(this, 'dateOnly')} type="date" />
          <div ref="p-dateOnly"></div>
          <pre className="prettyprint">{`<Datetime type="date" />`}</pre>

          <h2 className="subhead">timeOnly</h2>
          <Datetime ref="d-timeOnly" onChange={this.handleChange.bind(this, 'timeOnly')} type="time" />
          <div ref="p-timeOnly"></div>
          <pre className="prettyprint">{`<Datetime type="time" />`}</pre>

          <h2 className="subhead">min & max</h2>
          <Datetime min="2016-01-12" max="2016-02-14 14:23:00" />
          <pre className="prettyprint">{`<Datetime min="2016-01-12" max="2016-02-14 14:23:00" />`}</pre>
          <Datetime min="2016-01-10" onChange={(value) => this.setState({ min: value })} type="date" max={this.state.max} /> - <Datetime  onChange={(value) => this.setState({ max: value })} type="date" min={this.state.min} />
          <pre className="prettyprint">{`<Datetime min="2016-01-10" onChange={(value) => this.setState({ min: value })} type="date" max={this.state.max} /> - <Datetime  onChange={(value) => this.setState({ max: value })} type="date" min={this.state.min} />`}</pre>

          <h2 className="subhead">format</h2>
          <Datetime ref="d-format" format="yyyy/MM/dd hh:mm" onChange={this.handleChange.bind(this, 'format')} value="2015-06-21 17:24" />
          <div ref="p-format"></div>
          <pre className="prettyprint">{`<Datetime format="yyyy/MM/dd hh:mm" value="2015-06-21 17:24" />`}</pre>

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
