var React = require('react')
var Classable = require('../mixins/classable')

function noop() {}

var Overlay = React.createClass({
  mixins: [Classable],

  render: function () {
    var className = this.getClasses('overlay') 
    var onClick = this.props.onClick || noop

    return (
      <div className={className} onClick={onClick} />
    )
  }
})

module.exports = Overlay
