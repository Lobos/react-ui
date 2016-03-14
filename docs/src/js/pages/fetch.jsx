'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const { Select, RadioGroup, Refetch } = global.uiRequire();

module.exports = class extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Fetch</h1>
          <h2>数据</h2>
        </div>

        <div className="content">
          <div>
            <ul>
              <li>Fetch 是一个Highorder Component，通过增加一个fetch属性，提供给Select, CheckboxGroup, RadioGroup, Table, Tree等组件获取服务端数据的能力。替代早期版本的DataSource。</li>
              <li>这些组件可以不使用fetch，通过data传入数据，当作一个Dumb组件使用。</li>
              <li>服务端交互部分使用了另外封装的一个工具，<a href="https://github.com/Lobos/refetch" target="_blank">Refetch</a></li>
            </ul>
          </div>

          <h2 className="subhead">Options</h2>
          <div>第一种用法，传入和Refetch对应的config</div>
          <Code>
{`fetch = {
  url: string
  method: get,post,delete,put,jsonp 默认为 get
  dataType: method 为jsonp时无效。可选值 post (default), json, text, arraybuffer, blob, document, formdata
  responseType: method 为jsonp时无效。可选值 json (default), text, xml, arraybuffer, blob, document
  headers: method 为jsonp时无效。object
  timeout: 毫秒
  cache: 缓存，单位秒，大于0时有效。使用localStorage做长期缓存，需要注意缓存数据大小。
  withCredentials: method 为jsonp时无效。是否支持跨域 default false
  async: method 为jsonp时无效。是否同步 default true
  delay: 延时处理，单位毫秒，默认为0。
  then: function 处理服务端返回数据
}`}
          </Code>
          <Example>
<Select grid={1/4}
  fetch={{
    method: 'get',
    url: './json/select.json',
    then: (res) => {
      if (res.success) {
        return res.list;
      } else {
        return new Error(res.message); 
      }
    }
  }} />
          </Example>

          <h2 className="subhead">Promise</h2>
          <div>第二种用法，传入一个Promise对象。</div>
          <Code>
{`fetch = Refetch.get('/example/url', ...)`}
          </Code>
          <Example>
<RadioGroup
  fetch={
    Refetch.get('./json/select.json').then((res) => {
      if (res.success) {
        return res.list;
      } else {
        return new Error(res.message); 
      }
    })
  }
/>
          </Example>

          <h2 className="subhead">简单的示意图</h2>
          <div>
            <img src="./images/fetch.png" />
          </div>
        </div>
      </div>
    );
  }
};
