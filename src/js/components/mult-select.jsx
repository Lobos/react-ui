var React = require('react')

var Strings = require('../utils/strings')
var Resourceable = require('../mixins/resourceable')
var Classable = require('../mixins/classable')
var ClickAwayable = require('../mixins/click-awayable')
var Validatable = require('../mixins/validatable')
var ReceiveValue = require('../mixins/receive-value')

var MultSelect = React.createClass({
  mixins: [Classable, ClickAwayable, Resourceable, Validatable, ReceiveValue],

  getInitialState: function () {
    return {
      data: this.props.data || [],
      active: false,
      hasError: false,
      hasValue: this.props.value,
      cols: this.props.cols || 4,
      text: [],
      msg: ''
    }
  },

  formatValue: function (value) {
    return Strings.formatValue(value, this.props.flat)
  },

  handleClick: function (item, index) {
    this.select(item, index)
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

    if (nextState.value !== this.state.value) {
      this.initValue(nextState.value)
    }
  },

  componentWillMount: function () {
    this.init(this.state.data, this.state.value)
  },

  initValue: function (value) {
    this.init(this.state.data, value)
  },

  initData: function (data) {
    this.init(data, this.state.value)
  },

  init: function (data, value) {
    //data = data.slice()
    if (data.length === 0) return
    for (var i=0, count=data.length; i<count; i++) {
      var d = data[i]
      d.$checked = value.indexOf(d.value) >= 0
    }
    this.setState({ data: data })
  },

  show: function () {
    if (!this.state.active)
      this.setState({ active: true })
  },

  select: function (item, index) {
    var data = this.state.data
    if (this.props.single) {
      for (var i=0, count=data.length; i<count; i++) {
        data[i].$checked = i === index
      }
    } else {
      data[index].$checked = !data[index].$checked
    }
    this.setState(data)
  },

  getValue: function (raw) {
    var value = []
    this.state.data.forEach(function (item) {
      if (item.$checked)
        value.push(item.value)
    })
    if ((this.props.flat || this.props.single) && raw !== true) {
      value = value.join(',')
    }
    return value
  },

  render: function () {
    var className = this.getClasses(
      'select', 
      {
        'active': this.state.active && !this.props.readOnly,
        'readonly': this.props.readOnly,
        'is-focused': this.state.active,
        'has-error': this.state.hasError
      }
    )

    var itemsClassName = 'mult-select-items select-cols-' + this.state.cols

    var text = []
    var items = this.state.data.map(function (item, i) {
      if (item.$checked) text.push(item.text)
      var active = item.$checked ? "active" : ""
      return (
        <li key={i} onClick={this.handleClick.bind(this, item, i)}>
          <a className={active} href="javascript:;">{item.text}</a>
        </li>
      )
    }, this)

    var placeholder = text.length > 0 ? "" : (this.state.data.length > 0 ? this.props.placeholder : this.state.msg)

    return (
      <div onClick={this.show} style={this.props.style} className={className}>
        <div className="inner">
          {<span className="placeholder">{placeholder}</span>}
          {text.join(',')}
        </div>
        <div className="dropdown-wrap">
          <ul ref="dropdown" className={itemsClassName}>{items}</ul>
        </div>
      </div>
    )
  }
})

module.exports = MultSelect
