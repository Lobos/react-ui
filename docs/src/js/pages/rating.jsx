"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
import {Rating, RadioGroup, Checkbox} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/Rating',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      color: null,
      readOnly: false,
      size: 2,
      maxValue: 5,
      value: 3,
      theme: 'star'
    }
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Rating</h1>
          <h2>评分，依赖于 <a href="#/icon">Icon</a></h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Rating
  className={string}  // class
  icons={array}       // length 为2的数组，值为Icon className，0为选中图标，1为未选中图标
  maxValue={int}      // 最大值，正整数，默认为 5
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  size={int}          // 图标大小，值为 1-5，也可以使用style.fontSize进行控制
  style={object}      // 样式，可以控制大小、颜色
  theme={string}      // 预置主题，目前有 "star", "heart" 两个可选，默认为 "star"
  value={number}      // 值，整数。只读状态下，支持小数
/>`}
          </pre>

          <h2 className="subhead">Example</h2>
          <p>
            <Rating size={this.state.size}
              maxValue={this.state.maxValue}
              theme={this.state.theme}
              icons={this.state.icons}
              readOnly={this.state.readOnly}
              value={this.state.value}
              onChange={value=>this.setState({ value })}
              style={{ color: this.state.color }}
            />
          </p>

          <div style={{marginBottom:10}}>
            <span>size: </span>
            <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true} onChange={size=>this.setState({ size })} value={this.state.size} data={[1, 2, 3, 4, 5]} />
          </div>

          <div style={{marginBottom:10}}>
            <span>maxValue: </span>
            <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true} onChange={maxValue=>this.setState({ maxValue })} value={this.state.maxValue} data={[5, 10, 12, 20]} />
          </div>

          <div style={{marginBottom:10}}>
            <span>theme: </span>
            <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true} onChange={theme=>this.setState({ theme })} value={this.state.theme} data={['star', 'heart']} />
          </div>

          <div style={{marginBottom:10}}>
            <span>color: </span>
            <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true} onChange={color=>this.setState({ color })} value={this.state.color} data={['red', 'black', 'gold', '#00aa55']} />
          </div>

          <p>
            <Checkbox onChange={checked=>this.setState({ icons: checked ? ["circle-o", "circle"] : null })} text={'设置icons为 ["circle-o", "circle"]'} />
          </p>

          <p>
            <Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })} text={'readOnly'} />
          </p>
          
          <div style={{marginBottom:10}}>
            <span>value: </span>
            <input onChange={event=>this.setState({ value: event.target.value })} type="text" value={this.state.value} />
          </div>

          <br />

          <pre className="prettyprint">
{`<Rating size={this.state.size}
  maxValue={this.state.maxValue}
  theme={this.state.theme}
  icons={this.state.icons}
  readOnly={this.state.readOnly}
  value={this.state.value}
  onChange={value=>this.setState({ value })}
  style={{ color: this.state.color }}
/>

// state
getInitialState: function () {
  return {
    color: null,
    readOnly: false,
    size: 2,
    maxValue: 5,
    value: 3,
    theme: 'star'
  }
}

size: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}
  onChange={size=>this.setState({ size })} value={this.state.size} data={[1, 2, 3, 4, 5]} />

maxValue: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}
  onChange={maxValue=>this.setState({ maxValue })} value={this.state.maxValue} data={[5, 10, 12, 20]} />

theme: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}
  onChange={theme=>this.setState({ theme })} value={this.state.theme} data={['star', 'heart']} />

color: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}
  onChange={color=>this.setState({ color })} value={this.state.color} data={['red', 'black', 'gold', '#00aa55']} />

<Checkbox onChange={checked=>this.setState({ icons: checked ? ["circle-o", "circle"] : null })}
  text={'设置icons为 ["circle-o", "circle"]'} />

<Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })}
  text={'readOnly'} />

value: <input onChange={event=>this.setState({ value: event.target.value })}
  type="text" value={this.state.value} />
`}
          </pre>
        </div>
      </div>
    )
  }
})
