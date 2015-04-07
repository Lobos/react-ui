var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var MultSelect = require('../libs').MultSelect

var exampleItems = require('../data/key-value')
var exampleSrc = window.location.pathname + 'json/select.json'

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Mult Select</h2>
        <p>多选控件</p>
        <br />

        <Arguments>
          <Arguments.Example>{'<MultSelect cols={int} flat={bool} src="string" data={array} placeholder="string" value={array} onChange={function} />'}</Arguments.Example>
          <Arguments.Item name="cols" type="Int" def="4">选项column数量，可选值为<code>1-6</code>，默认为<code>4</code></Arguments.Item>
          <Arguments.Item name="data" type="Array">数据，格式为<code>{'[{"value":"", "text":""}]'}</code></Arguments.Item>
          <Arguments.Item name="flat" type="Bool" def="false">为<code>true</code>时，所有value作为string处理，getValue返回值为<code>,</code>分隔字符串</Arguments.Item>
          <Arguments.Item name="src" type="String">数据源http地址，与data二选一，优先处理data</Arguments.Item>
          <Arguments.Item name="single" type="Bool" def="false">为<code>true</code>时，单选</Arguments.Item>
          <Arguments.Item name="placeholder" type="String">占位文字</Arguments.Item>
          <Arguments.Item name="value" type="String|Array">初始值</Arguments.Item>
          <Arguments.Item name="onChange" type="function">选择事件</Arguments.Item>
        </Arguments>

        <h3>Mehtods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前选中项 <code>value</code> 值集合，如果flat为<code>true</code>，返回<code>String</code>，否则返回<code>Array</code></p>
        </Arguments>

        <Example text={'<MultSelect placeholder="选择一个城市" className="form-control" style={{width:400}} data={exampleItems} />'}>
          <MultSelect placeholder="选择一个城市" className="form-control" style={{width:400}} data={exampleItems} />
        </Example>

        <Example title="init value" text={'<MultSelect className="form-control" value={["shanghai", "beijing", "chengdu"]} style={{width:400}} src={exampleSrc} />'}>
          <MultSelect className="form-control" value={["shanghai", "beijing", "chengdu"]} style={{width:400}} src={exampleSrc} />
        </Example>

        <Example title="single" text={'<MultSelect className="form-control" cols={3} single={true} style={{width:400}} src={exampleSrc} />'}>
          <MultSelect className="form-control" cols={3} single={true} style={{width:400}} src={exampleSrc} />
        </Example>
      </div>
    )
  }
})
