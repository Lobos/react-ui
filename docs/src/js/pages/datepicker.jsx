"use strict";

import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Code from '../Code';
import Example from '../Example';
const {Datepicker, DatepickerPair} = global.uiRequire();

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      min: null,
      max: null
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Datepicker/Datetime</h1>
          <h2>日期 / 时间 选择器</h2>
        </div>

        <div className="content">
          <Code>
{`<Datepicker
  readOnly={bool}       // 只读，默认为 false
  format={string}       // 返回值格式，如 'yyyy-MM-dd'，默认值 在 Lang.date.format 下设置
  min={string|long|Date} // 最小值，可以为string，unixtimestamp或者Date对象
  max={string|long|Date} // 最大值，可以为string，unixtimestamp或者Date对象
  unixtime={bool}       // 为 true 时，getValue 返回 unixtimestamp
  placeholder={string}  // 占位提示文字
  onChange={function}   // 值改变时触发事件，参数为 value
  type={string}         // 可选值为 'datetime|date|time'，默认值为'datetime'
  value={string|number} // 初始值
/>`}
          </Code>
          <p style={{color:'red'}}>0.6 删除了 dateOnly and timeOnly，使用type="date|time"代替</p>
          <p>0.6 改名为Datepicker，Datetime暂时可以继续使用</p>

          <h2 className="subhead">Example</h2>
          <Example>
<Datepicker
  onChange={(value) => this.setState({ normal: value })}
  value="2015-06-21 17:24:03" />
<span>{this.state.normal}</span>
          </Example>

          <h2 className="subhead">date</h2>
          <Example>
<Datepicker type="date"
  onChange={(value) => this.setState({ dateValue: value })} />
<span>{this.state.dateValue}</span>
          </Example>

          <h2 className="subhead">time</h2>
          <Example>
<Datepicker type="time"
  value="17:05:21"
  onChange={(value) => this.setState({ timeValue: value })} />
<span>{this.state.timeValue}</span>
          </Example>

          <h2 className="subhead">min & max</h2>
          <Example>
<Datepicker min="2016-01-12" max="2016-02-14 14:23:00" />
          </Example>

          <Example>
<Datepicker min="2016-01-10"
  onChange={(value) => this.setState({ min: value })}
  type="date"
  max={this.state.max} />
-
<Datepicker onChange={(value) => this.setState({ max: value })}
  type="date"
  min={this.state.min} />
          </Example>

          <h2 className="subhead">format</h2>
          <Example>
<Datepicker format="yyyy/MM/dd hh:mm"
  onChange={(value) => this.setState({ formatValue: value })}
  value="2015-06-21 17:24" />
<span>{this.state.formatValue}</span>
          </Example>

          <h2 className="subhead">readOnly</h2>
          <Example>
<Datepicker readOnly={true} value="2015-06-21 17:24:03" />
          </Example>

          <h2 className="subhead">unixtime</h2>
          <Example>
<Datepicker unixtime={true}
  onChange={(value) => this.setState({ unixtimeValue: value })} />
<span>{this.state.unixtimeValue}</span>
          </Example>

          <h2 className="subhead">DatepickerPair</h2>
          <div>增加一个快捷方式，可以成对的使用Datepicker，第一个Datepicker的选中值作为第二个Datepicker的最小值，第二个Datepicker的选中值作为第一个Datepicker的最大值</div>
          <Code>
{`<DatepickerPair
  names={[string, string]}  // 字段名，长度为2的数组
  con={string|element}      // 两个控件中间的连接符，默认为 '-'
  max={string|long|Date}    // 第二个控件的最大值
  min={string|long|Date}    // 第一个控件的最小值
  {...props}                // 其他同Datepicker
/>`}
          </Code>
          <Example>
<DatepickerPair min="2016-03-16" max="2016-08-21" type="date" names={["startTime", "endTime"]} />
          </Example>
        </div>
      </div>
    );
  }
}
