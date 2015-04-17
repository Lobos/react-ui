var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')
var Classable = require('../mixins/classable')
var ReceiveValue = require('../mixins/receive-value')

var Rating = React.createClass({
  mixins: [Classable, ReceiveValue],

  getInitialState: function () {
    return {
      max: this.props.max || 5,
      icons: this.props.icons || ['star-o', 'star']
    }
  },

  getBackground: function () {
    var items = [],
        icon = this.state.icons[0]
    for (var i=0; i<this.state.max; i++) {
      items.push(<Icon key={i} icon={icon} />)
    }

    return <div className="rating-bg">{items}</div>
  },

  getHandle: function () {
    var items = [],
        icon = this.state.icons[1]
    for (var i=0, active; i<this.state.max; i++) {
      active = this.state.value > i
      items.push(<Icon className={classnames('handle', { 'active': active })} key={i} icon={icon} />)
    }

    return <div className="rating-front">{items}</div>
  },

  getMute: function () {
    var items = [],
        icon = this.state.icons[1],
        width = (this.state.value / this.state.max * 100) + '%'

    for (var i=0; i<this.state.max; i++) {
      items.push(<Icon key={i} icon={icon} />)
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
    return (
      <div style={this.props.style} className="rating">
        {this.getBackground()}
        { this.props.readOnly ? this.getMute() : this.getHandle() }
      </div>
    )
  }
})

module.exports = Rating
