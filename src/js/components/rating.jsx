"use strict"

require('../../less/rating.less')

let React = require('react')
let classnames = require('classnames')
let Classable = require('../mixins/classable')
let ReceiveValue = require('../mixins/receive-value')

let themes = {
  // "star": [Icon, Icon],
  // "heart": [img, img]
}

let Rating = React.createClass({
  displayName: 'Rating',

  propTypes: {
    icons: React.PropTypes.array,
    maxValue: React.PropTypes.number,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    theme: React.PropTypes.string,
    value: React.PropTypes.number
  },

  mixins: [Classable, ReceiveValue],

  getDefaultProps: function () {
    return {
      maxValue: 5
    }
  },

  getInitialState: function () {
    return {
      hover: 0,
      wink: false
    }
  },

  handleHover: function (value) {
    return function () {
      this.setState({ hover: value })
    }.bind(this)
  },

  handleLeave: function () {
    this.setState({ hover: 0 })
  },

  getValue: function () {
    return this.state.value
  },

  getIcon: function (pos = 0) {
    let icons = this.props.icons
    if (!icons) {
      let theme = this.props.theme || Object.keys(themes)[0]
      icons = themes[theme]
    }
    if (!icons) {
      console.warn('icons or theme not exist')
      return null
    }

    return icons[pos]
  },

  getBackground: function () {
    let items = [],
        icon = this.getIcon(0)
    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(React.addons.cloneWithProps(icon))
    }

    return <div className="rating-bg">{items}</div>
  },

  handleChange: function (val) {
    this.setValue(val)
    this.setState({ wink: true })
    setTimeout(() => {
      this.setState({ wink: false })
    }, 1000)
    if (this.props.onChange) {
      this.props.onChange(val)
    }
  },

  getHandle: function () {
    let items = [],
        icon = this.getIcon(1),
        hover = this.state.hover,
        wink = this.state.wink,
        value = hover > 0 ? hover : this.state.value

    for (let i = 0, active; i < this.props.maxValue; i++) {
      active = value > i
      items.push(
        <span key={i}
          onMouseOver={this.handleHover(i + 1)}
          onClick={this.handleChange.bind(this, i + 1)}
          className={classnames('handle', { 'active': active, 'wink': active && wink })}>
          {React.addons.cloneWithProps(icon)}
        </span>
      )
    }

    return <div onMouseOut={this.handleLeave} className="rating-front">{items}</div>
  },

  getMute: function () {
    let items = [],
        icon = this.getIcon(1),
        width = (this.state.value / this.props.maxValue * 100) + '%'

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(React.addons.cloneWithProps(icon))
    }

    return (
      <div style={{ width: width }} className="rating-front">
        <div className="rating-inner">
          {items}
        </div>
      </div>
    )
  },

  render: function () {
    let className = this.getClasses("rating")
    return (
      <div style={this.props.style} className={className}>
        { this.getBackground() }
        { this.props.readOnly ? this.getMute() : this.getHandle() }
      </div>
    )
  }
})

Rating.register = function (key, icons) {
  themes[key] = icons
}

module.exports = Rating
require('./form-control.jsx').register('Rating', Rating)
