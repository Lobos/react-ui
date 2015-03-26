var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var CheckboxGroup = require('../libs').CheckboxGroup

var exampleItems = [
  { "value": "nanjing", "text": "南京" },
  { "value": "beijing", "text": "北京" },
  { "value": "shanghai", "text": "上海" }
]
var exampleSrc = window.location.pathname + 'json/select.json'

module.exports = React.createClass({
  handleChange: function (ref) {
    return function () {
      var value = this.refs[ref].getValue()
      this.refs[ref + 'p'].getDOMNode().innerHTML = value
    }.bind(this)
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Checkbox group</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<CheckboxGroup src="text" data={array} flat={bool} value={object} onChange={function} />'}</Arguments.Example>
          <Arguments.Item name="data" type="Array">数据，格式为<code>{'[{"value":"", "text":""}]'}</code></Arguments.Item>
          <Arguments.Item name="src" type="String">数据源http地址，与data二选一，优先处理data</Arguments.Item>
          <Arguments.Item name="flat" type="Bool" def="false">为<code>true</code>时，所有value作为string处理，getValue返回值为<code>,</code>分隔字符串</Arguments.Item>
          <Arguments.Item name="value" type="String||Array">初始值</Arguments.Item>
        </Arguments>

        <h3>Mehtods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前选中项 <code>value</code> 值集合，如果flat为<code>true</code>，返回<code>String</code>，否则返回<code>Array</code></p>
        </Arguments>

        <Example text={'<CheckboxGroup ref="checkgroup1" data={exampleItems} onChange={this.handleChange("checkgroup1")} />\n<p ref="checkgroup1p"></p>'}>
          <CheckboxGroup ref="checkgroup1" data={exampleItems} onChange={this.handleChange('checkgroup1')} />
          <p ref="checkgroup1p"></p>
        </Example>

        <Example text={'<CheckboxGroup value="guangzhou,chengdu" ref="checkgroup2" src={exampleSrc} inline={true} onChange={this.handleChange("checkgroup2")} />\n<p ref="checkgroup2p"></p>'}>
          <CheckboxGroup value="guangzhou,chengdu" ref="checkgroup2" src={exampleSrc} inline={true} onChange={this.handleChange('checkgroup2')} />
          <p ref="checkgroup2p"></p>
        </Example>
      </div>
    )
  }
})
