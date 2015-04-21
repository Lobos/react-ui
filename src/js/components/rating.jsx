var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var themes = {
  "star": ['star-o', 'star'],
  "heart": ['heart-o', 'heart']
}

var Rating = React.createClass({
  mixins: [Classable, ReceiveValue],

  getInitialState: function () {
    return {
      hover: 0,
      wink: false,
      icons: this.props.icons || themes[this.props.theme || "star"]
    }
  },

  getMax: function () {
    return this.props.maxValue || 5
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.theme !== this.props.theme) {
      var icons = themes[nextProps.theme]
      if (icons)
        this.setState({icons: icons})
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
    var items = [],
        icon = this.state.icons[0]
    for (var i=0, max=this.getMax(); i<max; i++) {
      items.push(<Icon size={this.props.size} key={i} icon={icon} />)
    }

    return <div className="rating-bg">{items}</div>
  },

  getHandle: function () {
    var self = this,
        items = [],
        icon = this.state.icons[1],
        hover = this.state.hover,
        wink = this.state.wink,
        value = hover > 0 ? hover : this.state.value

    var set = function (val) {
      return function () {
        self.setValue(val)
        self.setState({ wink: true })
        setTimeout(function () {
          self.setState({ wink: false })
        }, 1000)
        if (self.props.onChange) 
          self.props.onChange(val)
      }
    }

    for (var i=0, active, max=this.getMax(); i<max; i++) {
      active = value > i
      items.push(
        <span key={i} 
          onMouseOver={this.handleHover(i+1)} 
          onClick={set(i+1)}
          className={classnames('handle', { 'active': active, 'wink': active && wink })}>
          <Icon size={this.props.size} icon={icon} />
        </span>
      )
    }

    return <div onMouseOut={this.handleLeave} className="rating-front">{items}</div>
  },

  getMute: function () {
    var items = [],
        icon = this.state.icons[1],
        width = (this.state.value / this.getMax() * 100) + '%'

    for (var i=0, max=this.getMax(); i<max; i++) {
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
    var theme = this.props.theme,
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

module.exports = Rating
