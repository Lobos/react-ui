var React = require('react')

var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')
var ClickAwayable = require('../mixins/click-awayable')

function rgb2hex(rgb){
  rgb = rgb.replace('rgb(', '').replace(')', '').split(',')
  return "#" +
    ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2)
}

var regHex = /^[0-9a-fA-F]{6}$/

var ColorPicker = React.createClass({
  mixins: [Classable, ReceiveValue, ClickAwayable],

  getInitialState: function () {
    return {
      active: false
    }
  },

  componentClickAway: function () {
    this.setState({ active: false })
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this._bindClickAway()
    } else {
      this._unbindClickAway()
    }
  },

  formatValue: function (value) {
    if (!value) return
    if (value.indexOf('rgb') === 0)
      value = rgb2hex(value)
    value = value.replace('#', '')
    return value
  },

  inputChange: function (event) {
    var value = event.target.value
    if (/^[0-9a-fA-F]{0,6}$/.test(value))
      this.setState({ value: value })
  },

  getPatterns: function () {

  },

  render: function () {
    var style = {}
    if (regHex.test(this.state.value)) style.backgroundColor = '#' + this.state.value

    var className = this.getClasses('color-picker', {
      active: this.state.active
    })

    return (
      <div className={className}>
        <div className="addon left">#</div>
        <input onChange={this.inputChange} value={this.state.value} type="text"></input>
        <div className="color-pre" style={style}></div>

        <div className="color-container">
          
        </div>
      </div>
    )
  }
})

module.exports = ColorPicker
