var React = require('react')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var ColorPicker = Libs.ColorPicker
var RadioGroup = Libs.RadioGroup
var toTextValue = Libs.Utils.Objects.toTextValue

module.exports = React.createClass({
  getInitialState: function () {
    return {
      type: 'hex'
    }
  },

  setType: function (value) {
    this.setState({ type:value })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Color Picker</h2>
        <br />

        <Example>
          <ColorPicker type={this.state.type} />
          Type: <RadioGroup style={{display:'inline-block'}} value={this.state.type} onChange={this.setType} inline={true} data={toTextValue(['hex', 'rgb', 'rgba', 'hsv'])} />
        </Example>
      </div>
    )
  }
})
