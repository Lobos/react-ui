var React = require('react')
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

        <Example>
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
