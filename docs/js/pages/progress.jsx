var React = require('react')
var Arguments = require('../components/arguments.jsx')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var Progress = Libs.Progress
var Checkbox = Libs.Checkbox
var RadioGroup = Libs.RadioGroup
var toTextValue = Libs.Utils.Objects.toTextValue

module.exports = React.createClass({
  getInitialState: function () {
    return {
      theme: '',
      maxValue: 100,
      minValue: 0,
      value: 15,
      unit: undefined,
      readOnly: false
    }
  },

  setUnit: function (value) {
    this.setState({ unit: value })
  },

  setReadonly: function (value) {
    this.setState({ readOnly: value })
  },

  setTheme: function (value) {
    this.setState({ theme: value })
  },

  setMax: function (event) {
    var value = parseFloat(event.target.value)
    if (value)
      this.setState({ maxValue: value })
  },

  setMin: function (event) {
    var value = parseFloat(event.target.value)
    if (value)
      this.setState({ minValue: value })
  },

  setValue: function (event) {
    var value = parseFloat(event.target.value)
    if (value)
      this.setState({ value: value || 0 })
  },

  handleChange: function (value) {
    this.setState({ value: value })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Progress</h2>
        <p></p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Progress unit="string" readOnly={bool} value={int} theme={string} maxValue={int} minValue={int} onChange={function(value)} fixed={int} />'}</Arguments.Example>
          <Arguments.Item name="unit" type="String" def="%">显示的单位</Arguments.Item>
          <Arguments.Item name="theme" type="String" def="">颜色主题，可选值为<code>''|'success'|'info'|'warning'|'danger'</code></Arguments.Item>
          <Arguments.Item name="minValue" type="int" def="0">最小值</Arguments.Item>
          <Arguments.Item name="maxValue" type="int" def="100">最大值</Arguments.Item>
          <Arguments.Item name="fixed" type="int" def="0">值为小数时，保留的位数</Arguments.Item>
          <Arguments.Item name="readOnly" type="bool" def="false">是否只读</Arguments.Item>
          <Arguments.Item name="value" type="number">初始值</Arguments.Item>
          <Arguments.Item name="onChange" type="function">选定分数后回调方法</Arguments.Item>
        </Arguments>

        <Example text={'<Progress unit={this.state.unit} readOnly={this.state.readOnly} value={this.state.value} theme={this.state.theme} maxValue={this.state.maxValue} minValue={this.state.minValue} onChange={this.handleChange} />'}>
          <Progress unit={this.state.unit} readOnly={this.state.readOnly} value={this.state.value} theme={this.state.theme} maxValue={this.state.maxValue} minValue={this.state.minValue} onChange={this.handleChange} />
          <Checkbox onChange={this.setReadonly} value={this.state.readOnly} text="readOnly" />
          Theme: <RadioGroup style={{display:'inline-block'}} value={this.state.theme} onChange={this.setTheme} inline={true} data={toTextValue(['success', 'info', 'warning', 'danger'])} />
          <br />
          Unit: <RadioGroup style={{display:'inline-block'}} value={this.state.unit} onChange={this.setUnit} inline={true} data={toTextValue(['%', 'kg', 'cm', '个'])} />
          <br />
          MaxValue: <input onChange={this.setMax} value={this.state.maxValue} />
          <br />
          MinValue: <input onChange={this.setMin} value={this.state.minValue} />
          <br />
          Value: <input onChange={this.setValue} value={this.state.value} />
        </Example>
      </div>
    )
  }
})
