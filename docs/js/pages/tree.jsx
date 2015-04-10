var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Tree = require('../libs').Tree

var exampleSrc = window.location.pathname + 'json/tree.json'

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: [],
      greedy: false,
      checkAble: true,
      checkKey: 'id'
    }
  },

  handleChange: function () {
    var value = this.refs.tree.getValue()
    this.setState({ value: value })
  },

  toggleGreedy: function () {
    var greedy = !this.state.greedy
    this.setState({ greedy: greedy })
    setTimeout(this.handleChange, 0)
  },

  toggleCheckAble: function () {
    var checkAble = !this.state.checkAble
    this.setState({checkAble: checkAble})
  },

  toggleCheckId: function () {
    var checkKey = this.state.checkKey === 'id' ? 'text': 'id'
    this.setState({checkKey: checkKey})
    setTimeout(this.handleChange, 0)
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Tree view</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<Tree flat={bool} greedy={bool} onChange={function} data={array} open={bool} value={string||array} checkAble={bool} src={string} />'}</Arguments.Example>
          <Arguments.Item name="data" type="Array">数据，格式为<code>{'[{"id":"", "text":"", ...}]'}</code></Arguments.Item>
          <Arguments.Item name="src" type="String">数据源http地址，与data二选一，优先处理data</Arguments.Item>
          <Arguments.Item name="flat" type="Bool" def="false">为<code>true</code>时，所有value作为string处理，getValue返回值为<code>,</code>分隔字符串</Arguments.Item>
          <Arguments.Item name="value" type="String|Array">初始值</Arguments.Item>
          <Arguments.Item name="greedy" type="Bool" def="false">为<code>true</code>时，getValue返回的值包含半选中项</Arguments.Item>
          <Arguments.Item name="checkAble" type="Bool" def="false">为<code>true</code>时，显示checkbox，可编辑</Arguments.Item>
          <Arguments.Item name="open" type="Bool" def="false">为<code>true</code>时，默认展开全部节点</Arguments.Item>
          <Arguments.Item name="checkKey" type="String" def="id">getValue时返回选中的data的key，默认为<code>id</code></Arguments.Item>
          <Arguments.Item name="onChange" type="function">选择后回调事件</Arguments.Item>
        </Arguments>

        <h3>Mehtods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前选中项值</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'setValue(value)'}</Arguments.Example>
          <p>设置<code>value</code></p>
          <br />
          <Arguments.Item name="value" require={true} type="String|Array"></Arguments.Item>
        </Arguments>

        <Example text={'<Tree ref="tree" flat={true} greedy={this.state.greedy} onChange={this.handleChange} checkKey={this.state.checkKey} open={true} value="config_list,config_delete" checkAble={this.state.checkAble} src={exampleSrc} />\n\n<p><a onClick={this.toggleGreedy} href="javascript:;" >Change greedy: {this.state.greedy.toString()}</a></p>\n<p><a onClick={this.toggleCheckId} href="javascript:;" >Change checkKey: {this.state.checkKey}</a></p>\n<p><a onClick={this.toggleCheckAble} href="javascript:;" >Change checkAble: {this.state.checkAble.toString()}</a></p>\n<p>\n<a onClick={function(){this.refs.tree.toggleAll(true)}.bind(this)} href="javascript:;" >全部展开</a>\n<a onClick={function(){this.refs.tree.toggleAll(false)}.bind(this)} href="javascript:;" >全部关闭</a>\n</p>\n<p><a onClick={function(){this.refs.tree.setValue("user_edit")}.bind(this)} href="javascript:;" >设置值为:user_edit</a></p>\n<p>Value:{this.state.value}</p>'}>
          <Tree ref="tree" flat={true} greedy={this.state.greedy} onChange={this.handleChange} open={true} checkKey={this.state.checkKey} value="config_list,config_delete" checkAble={this.state.checkAble} src={exampleSrc} />
          <p><a onClick={this.toggleGreedy} href="javascript:;" >Change greedy: {this.state.greedy.toString()}</a></p>
          <p><a onClick={this.toggleCheckId} href="javascript:;" >Change checkKey: {this.state.checkKey}</a></p>
          <p><a onClick={this.toggleCheckAble} href="javascript:;" >Change checkAble: {this.state.checkAble.toString()}</a></p>
          <p>
            <a onClick={function(){this.refs.tree.toggleAll(true)}.bind(this)} href="javascript:;" >全部展开</a>{' '}
            <a onClick={function(){this.refs.tree.toggleAll(false)}.bind(this)} href="javascript:;" >全部关闭</a>
          </p>
          <p><a onClick={function(){this.refs.tree.setValue('user_edit')}.bind(this)} href="javascript:;" >设置值为:user_edit</a></p>
          <p>Value:{this.state.value}</p>
        </Example>
      </div>
    )
  }
})
