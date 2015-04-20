var React = require('react')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var Progress = React.createClass({
  mixins: [Classable, ReceiveValue],

  getInitialState: function () {
    return {
      tip: 0,
      width: 0
    }
  },

  getUnit: function () {
    var unit = this.props.unit
    if (unit === undefined) unit = '%'
    return unit
  },

  componentDidMount: function () {
    //var width = React.findDOMNode(this).offsetWidth
    //this.setState({ width: width })
  },

  getProgress: function () {
    var max = this.props.maxValue || 100,
        min = this.props.minValue || 0,
        value = parseFloat(this.state.value) || 0,
        per = value * 100 / (max - min)

    return per
  },

  getPer: function () {
    var left = window.event.offsetX || window.event.layerX,
        width = React.findDOMNode(this).offsetWidth,
        per = Math.ceil(left * 100 / width) 
    return per
  },

  setTip: function () {
    this.setState({ tip: this.getPer() })
  },

  handleClick: function () {
    var per = this.getPer(),
        max = this.props.maxValue || 100,
        min = this.props.minValue || 0,
        value = (max - min) / 100 * per
    this.setState({ value: value })
    if (this.props.onChange)
      this.props.onChange(value)
  },

  render: function () {
    var bar = 'progress-bar' + (this.props.theme ? ' progress-bar-' + this.props.theme : '')

    return (
      <div onClick={!this.props.readOnly && this.handleClick} onMouseMove={!this.props.readOnly && this.setTip} className={this.getClasses('progress-wrap')}>
        <div className="progress">
          <div style={{ width: this.getProgress() + '%' }} className={bar}>{this.state.value}{this.getUnit()}</div>
          {!this.props.readOnly && <span style={{ left: this.state.tip + '%' }} className="progress-tip">{this.state.tip}{this.getUnit()}</span>}
        </div>
      </div>
    )
  }
})

module.exports = Progress
