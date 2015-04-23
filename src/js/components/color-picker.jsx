var React = require('react')
var Dom = require('../utils/dom')
var Color = require('../utils/color')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')
var ClickAwayable = require('../mixins/click-awayable')

//var regHex = /^[0-9a-fA-F]{6}$/

var ColorPicker = React.createClass({
  mixins: [Classable, ReceiveValue, ClickAwayable],

  getInitialState: function () {
    return {
      active: false,
      handle: { h: 0, s: 0, v: 0 },
      hueBase: new Color('#ffffff'),
      color: new Color(this.props.value)
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
    var color = new Color(value)
    value = color.toString('hex')
    if (value) value = value.replace('#', '')
    return value
  },

  inputChange: function (event) {
    var value = event.target.value.replace(/\s/g, ''),
        text = this.wrap(value)
    if (Color.check(text, this.props.type)) {
      this.setState({ color: new Color(text), value: value })
    } else {
      this.setState({ value: value })
    }
  },

  wrap: function (value) {
    if (!value) return ''
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
    if (this.isHexType()) {
      value = value.replace('#', '')
    } else {
      value = value.substr(value.indexOf('(') + 1).replace(')','')
    }
    return value
  },

  isHexType: function () {
    return !this.props.type || this.props.type === 'hex'
  },

  hueClick: function (event) {
    var hue = React.findDOMNode(this.refs.hue),
        top = event.pageY - Dom.offset(hue).top,
        hsv = this.state.color.hsv() || { s:100, v:100 },
        handle = this.state.handle

    handle.h = top

    hsv.h = Math.round(top / hue.clientHeight * 360)
    var color = new Color(hsv)
    this.setState({ color: color, handle: handle, hueBase: color, value: this.peel(color.toString(this.props.type)) })
  },

  panelClick: function (event) {
    var panel = React.findDOMNode(this.refs.panel),
        offset = Dom.offset(panel),
        left = event.pageX - offset.left,
        top = event.pageY - offset.top,
        width = panel.clientWidth,
        height = panel.clientHeight,
        hsv = this.state.color.hsv() || { h: 0 },
        handle = this.state.handle

    handle.s = left
    handle.v = top

    hsv.s = Math.round(left / width * 100)
    hsv.v = Math.round(100 - top / height * 100)

    var color = new Color(hsv)
    this.setState({ color: color, handle: handle, value: this.peel(color.toString(this.props.type)) })
  },

  getHue: function () {
    var divs = []
    for (var i=1; i<7; i++) {
      divs.push(<div key={i} className={"sp-" + i} />)
    }

    return (
      <div ref="hue" onClick={this.hueClick} className="hue">
        {divs}
        <div style={{ top: this.state.handle.h }} className="hue-handle" />
      </div>
    )
  },

  render: function () {
    var color = this.state.color,
        type  = this.props.type,
        handle = this.state.handle

    var className = this.getClasses('color-picker', {
      active: this.state.active,
      large: !this.isHexType()
    })

    return (
      <div className={className}>
        <div className="addon left">{ this.isHexType() ? '#' : type }</div>
        <input onChange={this.inputChange} value={this.state.value} type="text"></input>
        <div className="color-pre" style={{ backgroundColor: color.toString() }}></div>

        <div className="color-container">
          {this.getHue()}
          <div ref="panel" onClick={this.panelClick} style={{ backgroundColor: this.state.hueBase.toString() }} className="color-panel">
            <div className="sat">
              <div className="val">
                <div style={{ left: handle.s, top: handle.v }} className="pointer-handle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ColorPicker
