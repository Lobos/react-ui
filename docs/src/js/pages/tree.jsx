"use strict";

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {Tree, Checkbox, Refetch, Icon} = global.uiRequire();

Tree.setDefaultIcons([
  <Icon style={{color: '#f2da81'}} icon="folder-star" />,
  <Icon style={{color: '#f2da81'}} icon="folder" />,
  <Icon icon="file" />
]);

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      readOnly: false,
      selectAble: true,
      greedy: false,
      sep: ',',
      value: 'role_delete',
      showValue: 'role_delete',
      showAccountsIcon: false,
      treeData: null
    };
  }

  componentWillMount () {
    Refetch.get('json/tree.json', null, {cache: 3600})
      .then(res => {
        this.setState({ treeData: JSON.stringify(res, null, 2) });
      });
  }

  handleChange (value) {
    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    }
    this.setState({ showValue: value });
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Tree</h1>
        </div>

        <div className="content">
          <Code>
{`<Tree
  className={string}  // class
  selectAble={bool}   // 是否可编辑，默认为 false
  data={array}        // 数据
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  greedy={bool}       // 为true时，getValue返回的值包含半选中项
  onClick={function(data)}  // 点击某元素触发事件，参数为当前节点
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={string|array}
/>`}
          </Code>
          <div><a href="#/dataSource">dataSource 参见这里</a></div>

          <h2 className="subhead">Example</h2>
          <Example>
<Tree fetch={{url:"json/tree.json", cache:3600}}
  readOnly={this.state.readOnly}
  selectAble={this.state.selectAble}
  greedy={this.state.greedy}
  icons={
    this.state.showAccountsIcon ?
      [
        <Icon icon="accounts-add" />,
        <Icon icon="accounts" />,
        <Icon icon="account" />
      ]:
      undefined
  }
  onChange={this.handleChange.bind(this)}
  textTpl="{text}({id})"
  valueTpl="{id}"
  value={this.state.value}
  open={true}
  sep={this.state.sep}
/>
<div>
  <Checkbox onChange={(value)=>this.setState({ selectAble: value })} checked={this.state.selectAble} text="selectAble" />
  <Checkbox onChange={(value)=>this.setState({ readOnly: value })} checked={this.state.readOnly} text="readOnly" />
  <Checkbox onChange={(value)=>this.setState({ greedy: value })} checked={this.state.gre} text="greedy" />
  <Checkbox onChange={(value)=>this.setState({ showAccountsIcon: value })} checked={this.state.showAccountsIcon} text="show accounts icon" />
  {
    ([',', '|', '#', null]).map((sep, i) => {
      return (
        <a key={i} style={{margin: "0 10px"}}
          onClick={() => { this.setState({ sep }) }}>
          {JSON.stringify(sep)}
        </a>
      );
    })
  }
</div>
<div>value: {this.state.showValue}</div>
          </Example>
          <Code>
{`Tree.setDefaultIcons([
  <Icon style={{color: '#f2da81'}} icon="folder-star" />,
  <Icon style={{color: '#f2da81'}} icon="folder" />,
  <Icon icon="file" />
]);`}
          </Code>
          
          <h2 className="subhead">数据格式</h2>
          <pre className="prettyprint">{this.state.treeData}</pre>
        </div>
      </div>
    );
  }
}
