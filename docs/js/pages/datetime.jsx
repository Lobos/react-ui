var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Datetime = require('../libs').Datetime


module.exports = React.createClass({
  select: function (ref) {
    var value = 'value：' + this.refs['d' + ref].getValue()
    React.findDOMNode(this.refs['p' + ref]).innerHTML = value
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Datetime</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<Datetime value={string|int} unixtime={bool} />'}</Arguments.Example>
          <Arguments.Item name="unixtime" type="Bool" def="false">值为<code>true</code>时，<code>value</code>值为unixtime格式(10位长整型)</Arguments.Item>
          <Arguments.Item name="value" type="String|Int(timestamp)"></Arguments.Item>
        </Arguments>

        <Example title="default" text={'<Datetime placeholder="开始日期" className="form-control" />'}>
          <Datetime ref="d1" onChange={this.select.bind(this, '1')} placeholder="开始日期" className="form-control" /><br />
          <p ref="p1"></p>
        </Example> 

        <Example title="unixtime" text={'<Datetime unixtime={true} className="form-control" />'}>
          <Datetime ref="d2" unixtime={true} onChange={this.select.bind(this, '2')} className="form-control" /><br />
          <p ref="p2"></p>
        </Example> 

        <Example title="dateOnly" text={'<Datetime dateOnly={true} className="form-control" />'}>
          <Datetime ref="d3" dateOnly={true} onChange={this.select.bind(this, '3')} className="form-control" /><br />
          <p ref="p3"></p>
        </Example> 

        <Example title="timeOnly" text={'<Datetime timeOnly={true} className="form-control" />'}>
          <Datetime ref="d4" timeOnly={true} onChange={this.select.bind(this, '4')} className="form-control" /><br />
          <p ref="p4"></p>
        </Example> 

        <Example title="初始化值" text={'<Datetime value="2014-12-13 10:15:23" time={true} className="form-control" />'}>
          <Datetime ref="d5" value="2014-12-13 10:15:23" onChange={this.select.bind(this, '5')} className="form-control" /><br />
          <p ref="p5"></p>
        </Example> 
      </div>
    )
  }
})
