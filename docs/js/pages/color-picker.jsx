var React = require('react')
var Arguments = require('../components/arguments.jsx')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var Checkbox = Libs.Checkbox
var ColorPicker = Libs.ColorPicker
var RadioGroup = Libs.RadioGroup
var toTextValue = Libs.Utils.Objects.toTextValue

module.exports = React.createClass({
  getInitialState: function () {
    return {
      type: 'hex',
      value: '',
      readOnly: false
    }
  },

  handleChange: function (value) {
    this.setState({ value: value })
  },

  setType: function (value) {
    this.setState({ type:value })
  },

  setReadonly: function (value) {
    this.setState({ readOnly: value })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Color Picker</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<ColorPicker onChange={function} value="string" type="string" />'}</Arguments.Example>
          <Arguments.Item name="type" type="String" def="hex">颜色格式化类型，可选值为：<code>hex|rgb|rgba|hsv</code></Arguments.Item>
          <Arguments.Item name="value" type="string">初始值</Arguments.Item>
          <Arguments.Item name="onChange" type="function">颜色变更后回调方法</Arguments.Item>
        </Arguments>

        <Example text={'<ColorPicker onChange={this.handleChange} value="#ffee00" readOnly={this.state.readOnly} type={this.state.type} />'}>
          <ColorPicker onChange={this.handleChange} value="#ffee00" readOnly={this.state.readOnly} type={this.state.type} />
          Type: <RadioGroup style={{display:'inline-block'}} value={this.state.type} onChange={this.setType} inline={true} data={toTextValue(['hex', 'rgb', 'rgba', 'hsv'])} />
          <Checkbox onChange={this.setReadonly} value={this.state.readOnly} text="readOnly" />
          <p>{this.state.value}</p>
        </Example>
      </div>
    )
  }
})
