"use strict";

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {Rating, Icon, RadioGroup, Input, Checkbox} = global.uiRequire();

const STARS = [
  <Icon size={2} style={{color: 'gold'}}>&#xe607;</Icon>,
  <Icon size={2} style={{color: 'gold'}}>&#xe606;</Icon>
];

const HEARTS = [
  <Icon size={2} icon="favorite-outline" style={{color: 'red'}} />,
  <Icon size={2} icon="favorite" style={{color: 'red'}} />
]

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      readOnly: false,
      maxValue: 10,
      value: 3,
      icons: STARS
    };
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Rating</h1>
          <h2>评分</h2>
        </div>

        <div className="content">
          <Code>
{`<Rating
  className={string}  // class
  icons={array}       // 数组，长度为2，值为element，两个元素宽度高度必须相同，0为未选中，1为选中
  maxValue={int}      // 最大值，正整数，默认为 5
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  theme={string}      // 主题，Rating.register 的主题名称
  value={number}      // 值，整数。只读状态下，支持小数
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Code>
{`// 演示代码star和heart用了两个不同的icon库，所以大小稍有不同
const STARS = [
  <Icon size={2} style={{color: 'gold'}}>&#xe607;</Icon>,
  <Icon size={2} style={{color: 'gold'}}>&#xe606;</Icon>
];

const HEARTS = [
  <Icon size={2} icon="favorite-outline" style={{color: 'red'}} />,
  <Icon size={2} icon="favorite" style={{color: 'red'}} />
]
`}
          </Code>
          <Example>
<Rating maxValue={this.state.maxValue}
  theme={this.state.theme}
  icons={this.state.icons}
  readOnly={this.state.readOnly}
  value={this.state.value}
  onChange={value=>this.setState({ value })}
/>

{/* =================== state control ====================== */}
<div style={{marginBottom: 10}}>
  <span>maxValue: </span>
  <RadioGroup inline={true}
    onChange={maxValue=>this.setState({ maxValue })}
    value={this.state.maxValue}
    data={[5, 10, 12, 20]} />
</div>

<div>
  <Checkbox onChange={
    checked=>this.setState({
      icons: checked ? HEARTS : STARS
    })}
    text={'设置icons为heart'} />
</div>

<div>
  <Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })} text={'readOnly'} />
</div>

<div style={{marginBottom: 10}}>
  <span>value: </span>
  <Input onChange={value=>this.setState({ value })} type="number" value={this.state.value} />
</div>
          </Example>
        </div>
      </div>
    );
  }
}
