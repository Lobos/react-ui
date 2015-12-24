"use strict";

import React from 'react';
import prettify from '../prettify';
const {Lang: {getLang}} = global.uiRequire();

class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      path: 'buttons.ok',
      text: getLang('request.status.405')
    };
  }

  handleChange (event) {
    let path = event.target.value;
    this.setState({ path });
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Language</h1>
          <h2>语言包</h2>
        </div>

        <div className="content">
          <div>所有提示文字信息都放在 <em>lang</em> 下。</div>
          <h2 className="subhead">setLang(map[,map2...])</h2>
          <div>更新或者增加信息。</div>

          <h2 className="subhead">getLang(path)</h2>
          <div>获取信息，<em>path</em> 为 <em>.</em> 分隔字符串。</div>
          <div>
            <input onChange={this.handleChange.bind(this)} value={this.state.path} type="text" />
            <div>{JSON.stringify(getLang(this.state.path), null, 4) || 'undefined'}</div>
          </div>

          <h2 className="subhead">当前信息</h2>
          <pre className="prettyprint">{JSON.stringify(getLang(), null, 4)}</pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
