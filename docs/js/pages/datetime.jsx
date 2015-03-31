var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Datetime = require('../libs').Datetime


module.exports = React.createClass({

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Datetime</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<Datetime value={string|int} timestamp={bool} />'}</Arguments.Example>
          <Arguments.Item name="timestamp" type="Bool" def="false">值为<code>true</code>时，<code>value</code>值为timestamp格式</Arguments.Item>
          <Arguments.Item name="value" type="String|Int(timestamp)"></Arguments.Item>
        </Arguments>

        <Example text={'<Datetime placeholder="开始时间" className="form-control" />'}>
          <Datetime placeholder="开始时间" className="form-control" />
        </Example> 
      </div>
    )
  }
})
