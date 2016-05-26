'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
import { Cn } from '../Language';
const {Pagination, Input, Checkbox} = global.uiRequire();

module.exports = class extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 2,
      size: 20,
      total: 1000,
      range: 10,
      mini: false
    };
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Pagination</h1>
          <h2>分页</h2>
        </div>

        <div className="content">
          <Code>
{`<Pagination
  page={int}          // 当前页码，默认为 1
  size={int}          // 每页显示条数，默认为 20
  range={int}         // 显示的页码按钮数量， 默认为 10
  total={int}         // 总条目数，默认为 0
  mini={bool}         // 是否简化版本
  onChange={function} // 页码点击时触发事件，参数为页码
/>`}
          </Code>
          <Cn>
            0.7 移除jumper, 如果有需要可以自行扩展<br />
            移除了内部state, 改为dumb组件, 需要用props来维护状态
          </Cn>

          <h2 className="subhead">Example</h2>
          <Example>
<Pagination
  page={this.state.page}
  size={this.state.size}
  total={this.state.total}
  range={this.state.range}
  mini={this.state.mini}
  onChange={(page) => this.setState({ page })}
/>

<p>page: <Input value={this.state.page} onChange={v => this.setState({page: parseInt(v) || 1})} /></p>
<p>size: <Input value={this.state.size} onChange={v => this.setState({size: parseInt(v) || 0})} /></p>
<p>total: <Input value={this.state.total} onChange={v => this.setState({total: parseInt(v) || 0})} /></p>
<p>range: <Input value={this.state.range} onChange={v => this.setState({range: parseInt(v) || 0})} /></p>
<p><Checkbox text="mini" onChange={mini => this.setState({mini})} value={this.state.mini} /></p>
          </Example>
        </div>
      </div>
    );
  }
};
