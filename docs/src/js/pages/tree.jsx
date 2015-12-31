"use strict";

import React from 'react';
import prettify from '../prettify';
const {Tree, Checkbox, Refetch, dataSource} = global.uiRequire();

class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      readOnly: false,
      selectAble: true,
      greedy: false,
      sep: ',',
      value: 'role_delete',
      showValue: 'role_delete',
      treeData: null
    };
  }

  componentWillMount () {
    Refetch.get('json/tree.json', null, {cache: 3600})
      .then(res => {
        this.setState({ treeData: JSON.stringify(res, null, 2) });
      });
  }

  handleChange () {
    let value = JSON.stringify(this.refs.tree.getValue());
    this.setState({ showValue: value });
  }

  sepChange (sep) {
    this.setState({ sep });
    setTimeout(()=>this.handleChange(), 0);
  }

  render () {
    let seps = ([',', '|', '#', null]).map((sep, i) => {
      return (
        <a key={i} style={{margin: "0 10px"}} onClick={this.sepChange.bind(this, sep)}>{JSON.stringify(sep)}</a>
      );
    });
    return (
      <div>
        <div className="header">
          <h1>Tree</h1>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Tree
  className={string}  // class
  selectAble={bool}    // 是否可编辑，默认为 false
  data={array|func}   // 数据，array 或者 dataSource
  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array
  greedy={bool}       // 为true时，getValue返回的值包含半选中项
  onClick={function(data)}  // 点击某元素触发事件，参数为当前节点
  onChange={function} // 当选项改变时回调方法，参数为 value
  readOnly={bool}     // 为 true 时，只读。默认为 false
  textTpl="string"    // 显示文字模板，默认为 "{text}"
  valueTpl="string"   // 返回数据模板，默认为 "{id}"
  value={string|array}
/>`}
        </pre>
        <div><a href="#/dataSource">dataSource 参见这里</a></div>

        <h2 className="subhead">Example</h2>
        <div>
          <Tree ref="tree" data={dataSource("json/tree.json")}
            readOnly={this.state.readOnly}
            selectAble={this.state.selectAble}
            greedy={this.state.greedy}
            onClick={item => this.refs.textClick.getDOMNode().innerText = `clicked ${item.text}`}
            onChange={this.handleChange.bind(this)}
            textTpl="{text}({id})"
            valueTpl="{id}"
            value={this.state.value}
            open={true}
            sep={this.state.sep}
          />
        </div>
        <div>
          <Checkbox onChange={(value)=>this.setState({ selectAble: value })} checked={this.state.selectAble} text="selectAble" />
          {' '}
          <Checkbox onChange={(value)=>this.setState({ readOnly: value })} checked={this.state.readOnly} text="readOnly" />
          {' '}
          <Checkbox onChange={(value)=>this.setState({ greedy: value })} checked={this.state.gre} text="greedy" />
        </div>
        <div>
          sep: {seps}
        </div>
        <div>value: {this.state.showValue}</div>
        <div ref="textClick"></div>
        <pre className="prettyprint">
{`<Tree ref="tree" data={dataSource("json/tree.json")}
  readOnly={this.state.readOnly}
  selectAble={this.state.selectAble}
  greedy={this.state.greedy}
  onChange={this.handleChange.bind(this)}
  onClick={item => this.refs.textClick.getDOMNode().innerText = 'clicked ' + item.text}
  textTpl="{text}({id})"
  valueTpl="{id}"
  value={this.state.value}
  open={true}
  sep={this.state.sep}
/>

<Checkbox onChange={(value)=>this.setState({ selectAble: value })}
  checked={this.state.selectAble} text="selectAble" />
<Checkbox onChange={(value)=>this.setState({ readOnly: value })}
  checked={this.state.readOnly} text="readOnly" />
<Checkbox onChange={(value)=>this.setState({ greedy: value })}
  checked={this.state.gre} text="greedy" />
<a onClick={this.changeKey}>Switch Key</a>
`}
        </pre>

        <h2 className="subhead">数据格式</h2>
        <pre className="prettyprint">{this.state.treeData}</pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
