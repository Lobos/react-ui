var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Select = require('../libs').Select

var exampleItems = require('../data/key-value')
var exampleSrc = window.location.pathname + 'json/select.json'

module.exports = React.createClass({
  getInitialState: function () {
    return {
      selectedText: ''
    }
  },

  onChange: function (item) {
    var text = '第二个select选择了' + item.text + '，值为' + item.value
    this.setState({ selectedText: text })
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Select</h2>
        <p>下拉选择控件</p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Select src="text" data={array} placeholder="text" style={object} onChange={function} />'}</Arguments.Example>
          <Arguments.Item name="data" type="Array">数据，格式为<code>{'[{"value":"", "text":""}]'}</code></Arguments.Item>
          <Arguments.Item name="src" type="String">数据源http地址，与data二选一，优先处理data</Arguments.Item>
          <Arguments.Item name="placeholder" type="String">占位文字</Arguments.Item>
          <Arguments.Item name="value" type="String">初始值</Arguments.Item>
          <Arguments.Item name="onChange" type="function">选择事件</Arguments.Item>
        </Arguments>

        <h3>Methods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前选中项 <code>value</code> 值</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'setValue(value)'}</Arguments.Example>
          <p>设置<code>value</code></p>
          <br />
          <Arguments.Item name="value" require={true} type="String"></Arguments.Item>
        </Arguments>

        <Example text={'<Select data={exampleItems} placeholder="选择一个城市" style={{width:200, display:"inline-block"}} className="form-control" />\n\n<Select src={exampleSrc} value="shanghai" placeholder="选择一个城市" style={{width:200, display:"inline-block"}} className="form-control" onChange={this.onChange} />'}>
          <Select ref="s1" data={exampleItems} placeholder="选择一个城市" style={{width:200, display:'inline-block'}} className="form-control" />
          <Select src={exampleSrc} value="shanghai" placeholder="选择一个城市" style={{width:200, display:'inline-block'}} className="form-control" onChange={this.onChange} />
          <br />
          <br />
          <p><a onClick={function () { this.refs.s1.setValue('nanjing') }.bind(this)} href="javascript:;">设置第一个select值为nanjing</a></p>
          <p>{this.state.selectedText}</p>
        </Example>
      </div>
    )
  }
})
