"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
import {Tree, Checkbox, Qwest} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/Tree',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      readOnly: false,
      checkAble: true,
      greedy: false,
      textKey: 'text',
      valueKey: 'id',
      sep: ',',
      value: 'role_delete',
      showValue: 'role_delete',
      treeData: null
    }
  },

  componentWillMount: function () {
    Qwest.get('json/tree.json', null, {cache: true})
      .then(res => {
        this.setState({ treeData: JSON.stringify(res, null, 2) })
      })
  },

  handleChange: function () {
    let value = JSON.stringify(this.refs.tree.getValue())
    this.setState({ showValue: value })
  },

  changeKey: function () {
    let { valueKey, textKey } = this.state
    this.setState({ valueKey: textKey, textKey: valueKey })
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Tree</h1>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Tree
  checkAble={bool}    // 是否可编辑，默认为 false
  data={array}        // 数据，与 src 二选一，优先使用 data
  src="string"        // 服务器端数据地址，与 data 二选一
  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  greedy={bool}       // 为true时，getValue返回的值包含半选中项
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textKey="string"    // 数据结构中显示文字的key，默认为 "text"
  valueKey="string"   // 数据结构中返回值的key，默认为 "id"
  value={string|array}
/>`}
        </pre>

        <h2 className="subhead">Example</h2>
        <p>
          <Tree ref="tree" src="json/tree.json"
            readOnly={this.state.readOnly}
            checkAble={this.state.checkAble}
            greedy={this.state.greedy}
            onChange={this.handleChange}
            textKey={this.state.textKey}
            valueKey={this.state.valueKey}
            value={this.state.value}
            open={true}
            sep={this.state.sep}
          />
        </p>
        <p>
          <Checkbox onChange={(value)=>this.setState({ checkAble: value })} checked={this.state.checkAble} text="checkAble" />
          {' '}
          <Checkbox onChange={(value)=>this.setState({ readOnly: value })} checked={this.state.readOnly} text="readOnly" />
          {' '}
          <Checkbox onChange={(value)=>this.setState({ greedy: value })} checked={this.state.gre} text="greedy" />
        </p>
        <p>
          sep: <input type="text" onChange={e=>this.setState({ sep: e.target.value })} value={this.state.sep} />
        </p>
        <p>
          <a onClick={this.changeKey}>Switch Key</a>
        </p>
        <button onClick={this.handleChange} type="button">刷新</button>
        <p>value: {this.state.showValue}</p>

        <h2 className="subhead">数据格式</h2>
        <pre className="prettyprint">{this.state.treeData}</pre>
        </div>
      </div>
    )
  }
})


