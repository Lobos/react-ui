var React = require('react')

var Classable = require('../mixins/classable')

var Form = React.createClass({
  mixins: [Classable],

  render: function () {
    var className = this.getClasses('')

    return (
      <form className={className}>{this.props.children}</form>
    )
  }
})

module.exports = Form
