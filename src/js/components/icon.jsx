var React = require('react')

var Classable = require('../mixins/classable')

var Icon = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      spin: this.props.spin
    }
  },

  propTypes: {
    icon: React.PropTypes.string,
    size: React.PropTypes.number,
    spin: React.PropTypes.bool
  },

  spin: function () {
    this.setState({ spin: true })
  },

  unspin: function () {
    this.setState({ spin: false })
  },

  render: function () {
    var classes = {
      'icon': true,
      'icon-spin': this.state.spin
    }
    if (this.props.icon)
      classes['icon-' + this.props.icon] = true

    var size = this.props.size || 1
    if (size > 5) size = 5 

    if (size > 1)
      classes['icon-' + size + 'x'] = true
    else if (size === 'lg')
      classes['icon-lg'] = true

    var className = this.getClasses(classes)

    return(
      <i className={className}></i>
    )
  }
})

module.exports = Icon
