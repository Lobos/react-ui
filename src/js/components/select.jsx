var React = require('react')
var Icon = require('./icon.jsx')

var Resourceable = require('../mixins/resourceable')
var Classable = require('../mixins/classable')
var ClickAwayable = require('../mixins/click-awayable')

var Select = React.createClass({
  mixins: [Classable, ClickAwayable, Resourceable],

  getInitialState: function () {
    return {
      data: [],
      active: false,
      hasError: false,
      hasValue: this.props.value,
      text: '',
      msg: '',
      value: this.props.value
    }
  },

  componentClickAway: function () {
    this.setState({ active: false })
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this._bindClickAway()
    } else {
      this._unbindClickAway()
    }
  },

  componentDidMount: function () {
    if (this.state.value && this.state.data)
      this.setValue(this.state.value)
  },

  show: function () {
    if (!this.state.active)
      this.setState({ active: true })
  },

  select: function (item) {
    this.setState({ 
      value: item.value, 
      text: item.text,
      hasValue: true,
      active: false
    })
    this.validate(item.value)
    if (this.props.onChange)
      this.props.onChange(item)
  },

  setText: function (text) {
    this.state.data.forEach(function (item) {
      if (item.text.toString() === text.toString()) {
        this.select(item)
      }
    }.bind(this))
  },

  setValue: function (value) {
    value = value || ''
    this.state.data.forEach(function (item) {
      if (item.value.toString() === value.toString()) {
        this.select(item)
      }
    }.bind(this))
  },

  getValue: function () {
    return this.state.value
  },

  handleClick: function (item) {
    return function () {
      this.select(item)
    }.bind(this)
  },

  render: function () {
    var className = this.getClasses(
      'select', 
      {
        'active': this.state.active,
        'is-focused': this.state.active,
        'has-error': this.state.hasError
      }
    )

    var text = this.state.text
    var items = this.state.data.map(function (item, i) {
      if (!text && item.value === this.state.value) text = item.text
      return (
        <li key={i} onClick={this.handleClick(item)}>
          <a href="javascript:;">{item.text}</a>
        </li>
      )
    }, this)

    var placeholder = text ? "" : (this.state.data.length > 0 ? this.props.placeholder : this.state.msg)

    return (
      <div onClick={this.show} style={this.props.style} className={className}>
        <div className="inner">
          {<span className="placeholder">{placeholder}</span>}
          {text}
        </div>
        <div className="dropdown-wrap">
          <ul ref="dropdown" className="dropdown-menu">{items}</ul>
        </div>
        <Icon icon="caret-down" />
      </div>
    )
  }
})

module.exports = Select
