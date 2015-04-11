var React = require('react')

var Classable = require('../mixins/classable')

var Form = React.createClass({
  mixins: [Classable],

  render: function () {
    return (
      <form>{this.props.children}</form>
    )
  }
})

module.exports = Form
