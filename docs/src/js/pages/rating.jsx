"use strict";

import React from 'react';
import prettify from '../prettify';
const {Rating, Icon, RadioGroup, Checkbox} = global.uiRequire();

Rating.register('star', [
  <Icon size={2} style={{color: 'gold'}} icon="star-border" />,
  <Icon size={2} style={{color: 'gold'}} icon="star" />
]);

class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      readOnly: false,
      maxValue: 5,
      value: 3,
      theme: 'star'
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
          <pre className="prettyprint">
{`<Rating
  className={string}  // class
  icons={array}       // 数组，长度为2，值为element，两个元素宽度高度必须相同，0为未选中，1为选中
  maxValue={int}      // 最大值，正整数，默认为 5
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  theme={string}      // 主题，Rating.register 的主题名称
  value={number}      // 值，整数。只读状态下，支持小数
/>

Rating.register( // 注册一个主题，供重复调用
  string,        // 主题名称
  array          // 等同与 icons
)
`}
          </pre>

          <h2 className="subhead">Example</h2>
          <div>
            <Rating maxValue={this.state.maxValue}
              theme={this.state.theme}
              icons={this.state.icons}
              readOnly={this.state.readOnly}
              value={this.state.value}
              onChange={value=>this.setState({ value })}
            />
          </div>

          <div style={{marginBottom: 10}}>
            <span>maxValue: </span>
            <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true} onChange={maxValue=>this.setState({ maxValue })} value={this.state.maxValue} data={[5, 10, 12, 20]} />
          </div>

          <div>
            <Checkbox onChange={
              checked=>this.setState({
                icons: checked ?
                  [<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />] :
                  null
              })}
              text={'设置icons为heart'} />
          </div>

          <div>
            <Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })} text={'readOnly'} />
          </div>

          <div style={{marginBottom: 10}}>
            <span>value: </span>
            <input onChange={event=>this.setState({ value: event.target.value })} type="text" value={this.state.value} />
          </div>

          <br />

          <pre className="prettyprint">
{`// 注册主题
Rating.register('star', [
  <Icon size={2} style={{color: 'gold'}} icon="star-outline" />,
  <Icon size={2} style={{color: 'gold'}} icon="star" />
])

// state
getInitialState: function () {
  return {
    readOnly: false,
    maxValue: 5,
    value: 3,
    theme: 'star'
  }
}

<Rating maxValue={this.state.maxValue}
  theme={this.state.theme}
  icons={this.state.icons}
  readOnly={this.state.readOnly}
  value={this.state.value}
  onChange={value=>this.setState({ value })}
/>

maxValue: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}
  onChange={maxValue=>this.setState({ maxValue })}
  value={this.state.maxValue} data={[5, 10, 12, 20]} />

<Checkbox onChange={
  checked=>this.setState({
    icons: checked ?
      [<Icon icon="favorite-outline" style={{color: 'red'}} />,
       <Icon icon="favorite" style={{color: 'red'}} />] :
      null
  })}
  text={'设置icons为heart'} />

<Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })}
  text={'readOnly'} />

value: <input onChange={event=>this.setState({ value: event.target.value })}
  type="text" value={this.state.value} />
`}
          </pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
