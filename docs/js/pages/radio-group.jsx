var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var RadioGroup = require('../libs').RadioGroup

var exampleItems = [
  { "value": "nanjing", "text": "南京" },
  { "value": "beijing", "text": "北京" },
  { "value": "shanghai", "text": "上海" }
]
//var exampleSrc = window.location.pathname + 'json/select.json'

module.exports = React.createClass({
  handleChange: function () {
    var value = this.refs.radio.getValue()
    this.refs.p.getDOMNode().innerHTML = value
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Radio group</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<RadioGroup src="text" data={array} flat={bool} value={object} onChange={function} />'}</Arguments.Example>
          <Arguments.Item name="data" type="Array">数据，格式为<code>{'[{"value":"", "text":""}]'}</code></Arguments.Item>
          <Arguments.Item name="src" type="String">数据源http地址，与data二选一，优先处理data</Arguments.Item>
          <Arguments.Item name="value" type="Object">初始值</Arguments.Item>
        </Arguments>

        <h3>Mehtods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前选中项 <code>value</code> 值</p>
        </Arguments>

        <Example text={'<RadioGroup onChange={this.handleChange} ref="radio" data={exampleItems} />\n<p ref="p"></p>'}>
          <RadioGroup onChange={this.handleChange} ref="radio" data={exampleItems} />
          <p ref="p"></p>
        </Example>
      </div>
    )
  }
})
