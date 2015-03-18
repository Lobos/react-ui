var React = require('react')
var Example = require('../components/example.jsx')
//var Arguments = require('../components/arguments.jsx')
var Select = require('../libs').Select

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Select</h2>
        <p>下拉选择控件</p>
        <br />

        <Example>
          <Select style={{width:200}} className="form-control" />
        </Example>
      </div>
    )
  }
})
