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

    var size = this.props.size
    if (size) {
      if ('number' === typeof size || size.length === 1)
        size = size + 'x'
      classes['icon-' + size] = true
    }

    var className = this.getClasses(classes)

    return(
      <i className={className}></i>
    )
  }
})

module.exports = Icon
