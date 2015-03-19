var React = require('react')
var Icon = require('./icon.jsx')

var TransitionEnd = require('../utils/transition-end')

var Resourceable = require('../mixins/resourceable')
var Classable = require('../mixins/classable')
var ClickAwayable = require('../mixins/click-awayable')
var Validatable = require('../mixins/validatable')

var Select = React.createClass({
  mixins: [Classable, ClickAwayable, Resourceable, Validatable],

  getInitialState: function () {
    return {
      data: [],
      active: false,
      hasError: false,
      hasValue: this.props.value,
      text: '',
      value: this.props.value
    }
  },

  componentClickAway: function () {
    this.setState({ active: false })
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.state.value) {
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

    var dropdown = this.refs.dropdown.getDOMNode()
    var self = this
    TransitionEnd(dropdown).bind(function () {
      setTimeout(function () {
        if (self.state.active) {
          dropdown.style.overflow = 'auto'
        } else {
          dropdown.style.overflow = 'hidden'
        }
      }, 500)
    })
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.data !== this.state.data || (prevState.value !== this.state.value && prevState.text === this.state.text)) {
      this.setValue(this.state.value)
    }
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
    if (this.props.onSelect)
      this.props.onSelect(item)
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

  render: function () {
    var className = this.getClasses(
      'select', 
      {
        'active': this.state.active,
        'is-focused': this.state.active,
        'has-error': this.state.hasError
      }
    )

    var items = this.state.data.map(function (item, i) {
      return (
        <SelectItem key={i} data={item} onSelect={this.select} />
      )
    }.bind(this))

    return (
      <div onClick={this.show} style={this.props.style} className={className}>
        <div className="inner">
          {!this.state.text && <span className="placeholder">{this.props.placeholder}</span>}
          {this.state.text}
        </div>
        <ul ref="dropdown" className="dropdown-menu">{items}</ul>
        <Icon icon="caret-down" />
      </div>
    )
  }
})

var SelectItem = React.createClass({
  handleClick: function () {
    this.props.onSelect(this.props.data)
  },

  render: function () {
    return (
      <li onClick={this.handleClick}>
        <a href="javascript:;">{this.props.data.text}</a>
      </li>
    )
  }
})

module.exports = Select
