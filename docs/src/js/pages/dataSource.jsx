'use strict'

import React from 'react'
import prettify from '../prettify'

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/DataSource'

  render () {
    return (
      <div>
        <div className="header">
          <h1>dataSource</h1>
          <h2>数据接口</h2>
        </div>

        <div className="content">
          <p>Select, Tree 等控件需要从服务器远程获取数据的接口。</p>
          <pre className="prettyprint">{`function (success, failure)`}</pre>
          <p>接口需要返回一个方法，包含两个回调参数，成功和失败</p>
          <p>ReactUI内部提供了一个dataSource，使用Qwest实现的，可以用其他的Ajax框架自行实现。</p>
          <pre className="prettyprint">
{`function (src, options) {
  return (success, failure) => {
    Qwest.get(src, null, options)
      .then(res => success(res))
      .catch(res => {
        if (failure) {
          failure(res)
        } else {
          Message.show(res, 'error')
        }
      })
  }
}`}
          </pre>
        </div>
      </div>
    )
  }
}
