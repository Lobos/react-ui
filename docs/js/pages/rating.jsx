var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')

var Libs = require('../libs')
var Rating = Libs.Rating
var Checkbox = Libs.Checkbox
var RadioGroup = Libs.RadioGroup

module.exports = React.createClass({
  getInitialState: function () {
    return {
      color: '',
      size: 2,
      maxValue: 10,
      theme: 'star',
      readOnly: false,
      value: 7.5
    }
  },

  setSize: function (value) {
    this.setState({ size: value })
  },

  setReadonly: function (value) {
    this.setState({ readOnly: value })
  },

  setTheme: function (value) {
    this.setState({ theme: value })
  },

  setColor: function (value) {
    this.setState({ color: value })
  },

  setMax: function (value) {
    this.setState({ maxValue: value })
  },

  setValue: function (event) {
    var value = parseFloat(event.target.value)
    this.setState({ value: value || 0 })
  },

  handleChange: function (value) {
    this.setState({ value: value })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Rating</h2>
        <p>评分</p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Rating theme={"star|heart"} style={object} readOnly={bool} maxValue={int} size={1-5} value={string} onChange={function(value)} />'}</Arguments.Example>
          <Arguments.Item name="theme" type="String" def="star">预设样式，可选值为<code>star|heart</code></Arguments.Item>
          <Arguments.Item name="size" type="int" def="1">可选值为<code>1|2|3|4|5</code></Arguments.Item>
          <Arguments.Item name="maxValue" type="int" def="5">最大值</Arguments.Item>
          <Arguments.Item name="readOnly" type="bool" def="false">是否只读，只读时，可以显示value的小数部分</Arguments.Item>
          <Arguments.Item name="value" type="number">初始值</Arguments.Item>
          <Arguments.Item name="onChange" type="function">选定分数后回调方法</Arguments.Item>
        </Arguments>

        <h3>Methods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前 <code>value</code> 值</p>
        </Arguments>

        <Example text={'<Rating theme={this.state.theme} style={{color:this.state.color}} readOnly={this.state.readOnly} maxValue={this.state.maxValue} size={this.state.size} value={this.state.value} onChange={this.handleChange} />'}>
          <Rating theme={this.state.theme} style={{color:this.state.color}} readOnly={this.state.readOnly} maxValue={this.state.maxValue} size={this.state.size} value={this.state.value} onChange={this.handleChange} />
          <br />
          Size: <RadioGroup style={{display:'inline-block'}} value={this.state.size} onChange={this.setSize} inline={true} data={[{text:"1", value:1}, {text:"2", value:2}, {text:"3", value:3}, {text:"4", value:4}, {text:"5", value:5}]} />
          <br />
          Theme: <RadioGroup style={{display:'inline-block'}} value={this.state.theme} onChange={this.setTheme} inline={true} data={[{text:"star", value:"star"}, {text:"heart", value:"heart"}]} />
          <br />
          Color: <RadioGroup style={{display:'inline-block'}} value={this.state.color} onChange={this.setColor} inline={true} data={[{text:"red", value:"red"}, {text:"gold", value:"gold"}, {text:"black", value:"black"}, {text:"#ccaa55", value:"#ccaa55"} ]} />
          <br />
          Max: <RadioGroup style={{display:'inline-block'}} value={this.state.maxValue} onChange={this.setMax} inline={true} data={[{text:"5", value:5}, {text:"10", value:10}, {text:"15", value:15}, {text:"20", value:20}]} />
          <Checkbox onChange={this.setReadonly} value={this.state.readOnly} text="readOnly" />
          Value: <input onChange={this.setValue} value={this.state.value} />
          <br />
          {JSON.stringify(this.state)}
        </Example>
      </div>
    )
  }
})
