var React = require('react')
var Arguments = require('../components/arguments.jsx')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var ModalActions = Libs.Actions.Modal

module.exports = React.createClass({
  open: function () {
    ModalActions.confirm('hehehe')
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Modal</h2>
        <br />

        <Arguments></Arguments>

        <Example>
          <a onClick={this.open} href="javascript:;">click</a>
        </Example>
      </div>
    )
  }
})
