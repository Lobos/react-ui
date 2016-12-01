'use strict'

import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import Refetch from 'refetch'
import { Select, RadioGroup } from 'rctui'
import { Cn, En } from '../Language'

const request = Refetch.create({
  promise: (f) => f.then((res) => {
    if (res.success) {
      return res.list
    } else {
      return new Error(res.message)
    }
  })
})

const fetchData = Refetch.get('./json/select.json').then((res) => {
  if (res.success) {
    return res.list
  } else {
    return new Error(res.message)
  }
})

module.exports = class extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Fetch</h1>
          <Cn tag="h2">数据</Cn>
        </div>

        <div className="content">
          <Cn>
            <ul>
              <li>Fetch 是一个高阶组件，通过增加一个fetch属性，提供给Select, CheckboxGroup, RadioGroup, Table, Tree等组件获取服务端数据的能力。替代早期版本的DataSource。</li>
              <li>这些组件可以不使用fetch，通过data传入数据，当作一个Dumb组件使用。</li>
              <li>服务端交互部分使用了另外封装的一个工具，<a href="https://github.com/Lobos/refetch" target="_blank">Refetch</a></li>
            </ul>
          </Cn>
          <En>
            Fetch is a higherorder Component, fetch remote data from server for dumb component, like Select, CheckboxGroup, RadioGroup, Table, Tree...
          </En>

          <h2 className="subhead">Fetch Config</h2>
          <Cn>第一种用法，传入和Refetch对应的config</Cn>
          <Cn>
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
    then: function 处理服务端返回数据,
    request: fetch对象，Promise A+ 规范。为空时使用内置的 refetch
  }`}
            </Code>
          </Cn>
          <En>
            <Code>
  {`fetch = {
    url             // string
    method          // 'get|post|delete|put|jsonp', default is 'get'
    dataType        // 'post|json|text|arraybuffer|blob|document|formdata', default is post. It's not work when method is 'jsonp'.
    responseType    // 'json|text|xml|arraybuffer|blob|document', default is json.  It's not work when method is 'jsonp'.
    headers         // http headers
    timeout         // ms
    cache           // second
    withCredentials // default is false
    async           // default is true
    delay           // ms
    then            // handle callback
    request         // fetch object, default is Refetch
  }`}
            </Code>
          </En>
          <Example>
<Select grid={1 / 4}
  fetch={{
    method: 'get',
    url: './json/select.json',
    then: (res) => {
      if (res.success) {
        return res.list
      } else {
        return new Error(res.message)
      }
    }
  }} />
          </Example>

          <h2 className="subhead">Handle Failure</h2>
          <Example>
<Select grid={1 / 4}
  fetch={{
    method: 'get',
    url: './json/no-result.json',
    then: (res) => {
      if (res.success) {
        return res.list
      } else {
        return new Error('Remote data error.')
      }
    }
  }} />
          </Example>

          <h2 className="subhead">Create a request</h2>
          <Code>
{`const request = Refetch.create({
  promise: (f) => f.then((res) => {
    if (res.success) {
      return res.list;
    } else {
      return new Error(res.message);
    }
  })
});`}
          </Code>
          <Example>
<Select grid={1 / 4}
  fetch={{
    request: request,
    method: 'get',
    url: './json/select.json'
  }} />
          </Example>

          <h2 className="subhead">Promise</h2>
          <Cn>第二种用法，传入一个Promise对象。</Cn>
          <Code>
{`
const fetchData = Refetch.get('./json/select.json').then((res) => {
  if (res.success) {
    return res.list
  } else {
    return new Error(res.message)
  }
})
`}

          </Code>
          <Example>
            <RadioGroup fetch={fetchData} />
          </Example>

          <Cn><h2 className="subhead">简单的示意图</h2></Cn>
          <div>
            <img src="./images/fetch.png" />
          </div>
        </div>
      </div>
    )
  }
}
