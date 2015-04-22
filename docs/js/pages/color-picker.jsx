var React = require('react')
var Example = require('../components/example.jsx')

var Libs = require('../libs')
var ColorPicker = Libs.ColorPicker

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Color Picker</h2>
        <br />

        <Example>
          <ColorPicker />
        </Example>
      </div>
    )
  }
})
