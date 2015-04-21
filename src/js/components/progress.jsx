var React = require('react')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var Progress = React.createClass({
  mixins: [Classable, ReceiveValue],

  getInitialState: function () {
    return {
      tip: 0,
      fixed: 0,
      width: 0
    }
  },

  getUnit: function () {
    var unit = this.props.unit
    if (unit === undefined) unit = '%'
    return unit
  },

  getValue: function () {
    return this.state.value
  },

  componentDidMount: function () {
    //var width = React.findDOMNode(this).offsetWidth
    //this.setState({ width: width })
  },

  getProgress: function () {
    var max = this.props.maxValue || 100,
        min = this.props.minValue || 0,
        value = parseFloat(this.state.value) || 0,
        per = (value - min) * 100 / max

    return per
  },

  getCurrentValue: function () {
    var left = window.event.offsetX || window.event.layerX,
        width = React.findDOMNode(this).offsetWidth,
        per = Math.ceil(left * 100 / width),
        max = this.props.maxValue || 100,
        min = this.props.minValue || 0,
        value = (max - min) / 100 * per + min
        value = value.toFixed(this.state.fixed)
    return [per, value]
  },

  handleMove: function () {
    var value = this.getCurrentValue()
    this.setState({ tipOffset: value[0], tip: value[1] })
  },

  handleClick: function () {
    var value = this.getCurrentValue()
    this.setState({ value: value[1] })
    if (this.props.onChange)
      this.props.onChange(value[1])
  },

  render: function () {
    var bar = 'progress-bar' + (this.props.theme ? ' progress-bar-' + this.props.theme : '')

    return (
      <div onClick={!this.props.readOnly && this.handleClick} onMouseMove={!this.props.readOnly && this.handleMove} className={this.getClasses('progress-wrap')}>
        <div className="progress">
          <div style={{ width: this.getProgress() + '%' }} className={bar}>{this.state.value}{this.getUnit()}</div>
          {!this.props.readOnly && <span style={{ left: this.state.tipOffset + '%' }} className="progress-tip">{this.state.tip}{this.getUnit()}</span>}
        </div>
      </div>
    )
  }
})

module.exports = Progress
