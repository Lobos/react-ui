var React = require('react')

var Classable = require('../mixins/classable')

var Table = React.createClass({
  mixins: [Classable],

  render: function () {
    return (
      <table className={this.getClasses('table')}></table>
    )
  }
})

module.exports = Table
