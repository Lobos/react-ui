var React = require('react')
var Draggable = require('./drag.jsx')

var Dom = require('../utils/dom')
var Color = require('../utils/color')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')
var ClickAwayable = require('../mixins/click-awayable')


var ColorPicker = React.createClass({
  mixins: [Classable, ReceiveValue, ClickAwayable],

  getInitialState: function () {
    return {
      active: false,
      hueBase: new Color('#ff0000'),
      color: new Color(this.props.value)
    }
  },

  getDefaultProps: function () {
    // save calculate element clientHeight, clientWidth
    return {
      pickerHeight: 180,
      pickerWidth: 180
    }
  },

  componentDidMount: function () {
    this.setDrag(this.state.color)
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

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.type !== this.props.type) {
      var value = this.peel(this.state.color.toString(nextProps.type))
      this.setState({ value: value })
    }
  },

  active: function () {
    this.setState({ active: true })
  },

  formatValue: function (value) {
    var color = new Color(value)
    value = this.peel(color.toString(this.props.type))
    this.setDrag(color)
    return value
  },

  getValue: function () {
    return this.state.color.toString(this.props.type)
  },

  handleChange: function (value) {
    if (this.props.onChange)
      this.props.onChange(value)
  },

  inputChange: function (event) {
    var value = event.target.value.replace(/\s/g, ''),
        text = this.wrap(value)
    if (Color.check(text, this.props.type)) {
      var color = new Color(text)
      this.setState({ color: color, hueBase: new Color().hsv(color.hsv().h, 100, 100), value: value })
      this.setDrag(color)
    } else {
      this.setState({ value: value })
    }
    this.handleChange(text)
  },

  wrap: function (value) {
    if (!value) return ''
    value = value.toLowerCase()
    switch (this.props.type) {
      case 'rgb':
        value = 'rgb(' + value + ')'
        break
      case 'rgba':
        value = 'rgba(' + value + ')'
        break
      case 'hsv':
        value = 'hsv(' + value + ')'
        break
      default:
        value = '#' + value
    }
    return value
  },

  peel: function (value) {
    if (!value) return ''
    value = value.toLowerCase()
    value = value.replace('#', '').substr(value.indexOf('(') + 1).replace(')','')
    return value
  },

  isHexType: function () {
    return !this.props.type || this.props.type === 'hex'
  },


  setHue: function (top) {
    var hsv = this.state.color.hsv() || { s:100, v:100 }

    hsv.h = Math.round(top / this.props.pickerHeight * 360)
    var color = new Color(hsv),
        text = color.toString(this.props.type)
    this.setState({ color: color, hueBase: new Color().hsv(hsv.h, 100, 100), value: this.peel(text) })
    this.handleChange(text)
  },

  hueClick: function (event) {
    var hue = React.findDOMNode(this.refs.hue),
        top = event.pageY - Dom.offset(hue).top
    this.setHue(top)
    this.refs.huedrag.setPosition({ clientY: top })
  },

  hueDrag: function (event, drag) {
    var top = drag.position.top
    this.setHue(top)
  },

  setDrag: function (color) {
    if (!color.color || !this.refs) return

    var hsv = color.hsv(),
        hueTop = hsv.h / 360 * this.props.pickerHeight,
        pointerTop = (1 - hsv.v / 100) * this.props.pickerHeight,
        pointerLeft = hsv.s / 100 * this.props.pickerWidth

    this.refs.huedrag.setPosition({ clientY: hueTop })
    this.refs.pointerdrag.setPosition({ clientY: pointerTop, clientX: pointerLeft })
    this.setState({ color: color })
  },

  pointerClick: function (event) {
    var panel = React.findDOMNode(this.refs.panel),
        offset = Dom.offset(panel),
        left = event.pageX - offset.left - 3,
        top = event.pageY - offset.top - 3

    this.setPointer(top, left)
    this.refs.pointerdrag.setPosition({ clientX: left, clientY: top })
  },

  pointerDrag: function (event, drag) {
    var top = drag.position.top,
        left = drag.position.left
    this.setPointer(top, left)
  },

  setPointer: function (top, left) {
    var width = this.props.pickerWidth,
        height = this.props.pickerHeight,
        hsv = this.state.color.hsv() || { h: 0 }

    hsv.s = Math.round(left / width * 100)
    hsv.v = Math.round(100 - top / height * 100)

    var color = new Color(hsv),
        text = color.toString(this.props.type)
    this.setState({ color: color, value: this.peel(text) })
    this.handleChange(text)
  },


  getHue: function () {
    var divs = [],
        hsv = this.getHsv(),
        top = hsv.h * 100 / 360
    for (var i=1; i<7; i++) {
      divs.push(<div key={i} className={"sp-" + i} />)
    }

    return (
      <div onClick={this.hueClick} ref="hue" className="hue">
        {divs}
        <div className="hue-wrap">
          <Draggable ref="huedrag" onStop={this.hueDrag} bound="parent" axis="y">
            <div style={{ top: top + '%' }} className="hue-handle" />
          </Draggable>
        </div>
      </div>
    )
  },

  getHsv: function () {
    var hsv = this.state.color.hsv()
    return hsv ? hsv : { h: 0, s: 0, v: 0 }
  },

  render: function () {
    var color = this.state.color,
        type  = this.props.type,
        hsv = this.getHsv()

    var className = this.getClasses('color-picker', {
      active: this.state.active,
      large: !this.isHexType()
    })

    return (
      <div onClick={!this.props.readOnly && this.active} className={className}>
        <div className="addon left">{ this.isHexType() ? '#' : type }</div>
        <input ref="input" onFocus={!this.props.readOnly && this.active} readOnly={this.props.readOnly} onChange={this.inputChange} value={this.state.value} type="text" />
        <div className="color-pre" style={{ backgroundColor: color.toString() }}></div>

        <div className="color-container">
          {this.getHue()}
          <div ref="panel" onClick={this.pointerClick} style={{ backgroundColor: this.state.hueBase.toString() }} className="color-panel">
            <div className="sat">
              <div className="val">
                <div className="pointer">
                  <Draggable ref="pointerdrag" onStop={this.pointerDrag} bound="parent">
                    <div style={{ left: hsv.s + '%', top: (100 - hsv.v) + '%' }} className="pointer-handle" />
                  </Draggable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ColorPicker
