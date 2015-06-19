"use strict"

require('../../less/rating.less')

let React = require('react')
let classnames = require('classnames')
let Icon = require('./icon.jsx')
let Classable = require('../mixins/classable')
let ReceiveValue = require('../mixins/receive-value')

let themes = {
  "star": ['star-o', 'star'],
  "heart": ['heart-o', 'heart']
}

module.exports = React.createClass({
  displayName: 'Rating',

  propTypes: {
    icons: React.PropTypes.array,
    maxValue: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    theme: React.PropTypes.string,
    value: React.PropTypes.number
  },

  mixins: [Classable, ReceiveValue],

  getDefaultProps: function () {
    return {
      maxValue: 5,
      theme: 'star'
    }
  },

  getInitialState: function () {
    return {
      hover: 0,
      wink: false,
      icons: this.props.icons || themes[this.props.theme]
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.theme !== this.props.theme) {
      let icons = themes[nextProps.theme]
      if (icons) {
        this.setState({icons: icons})
      }
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

  getBackground: function () {
    let items = [],
        icon = this.state.icons[0]
    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(<Icon size={this.props.size} key={i} icon={icon} />)
    }

    return <div className="rating-bg">{items}</div>
  },

  getHandle: function () {
    let self = this,
        items = [],
        icon = this.state.icons[1],
        hover = this.state.hover,
        wink = this.state.wink,
        value = hover > 0 ? hover : this.state.value

    let set = function (val) {
      return function () {
        self.setValue(val)
        self.setState({ wink: true })
        setTimeout(function () {
          self.setState({ wink: false })
        }, 1000)
        if (self.props.onChange) {
          self.props.onChange(val)
        }
      }
    }

    for (let i = 0, active; i < this.props.maxValue; i++) {
      active = value > i
      items.push(
        <span key={i}
          onMouseOver={this.handleHover(i + 1)}
          onClick={set(i + 1)}
          className={classnames('handle', { 'active': active, 'wink': active && wink })}>
          <Icon size={this.props.size} icon={icon} />
        </span>
      )
    }

    return <div onMouseOut={this.handleLeave} className="rating-front">{items}</div>
  },

  getMute: function () {
    let items = [],
        icon = this.state.icons[1],
        width = (this.state.value / this.props.maxValue * 100) + '%'

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(<Icon size={this.props.size} key={i} icon={icon} />)
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
    let theme = this.props.theme,
        className = this.getClasses("rating", {
          'rating-star': theme === 'star',
          'rating-heart': theme === 'heart'
        })
    return (
      <div style={this.props.style} className={className}>
        {this.getBackground()}
        { this.props.readOnly ? this.getMute() : this.getHandle() }
      </div>
    )
  }
})
