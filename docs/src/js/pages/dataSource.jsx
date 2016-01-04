'use strict';

import React from 'react';
import prettify from '../prettify';

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>dataSource</h1>
          <h2>数据接口</h2>
        </div>

        <div className="content">
          <h3 style={{color: 'red'}}>下个版本将废除，改用highorder compontent</h3>
          <p>Select, Tree 等控件需要从服务器远程获取数据的接口。</p>
          <p>接口返回一个方法，<em>then</em>成功回调，<em>catch</em>失败回调，<em>complete</em>成功与失败都会调用</p>
          <p>ReactUI内部提供了一个dataSource，使用Qwest实现的，可以用其他的Ajax框架自行实现。</p>
          <pre className="prettyprint">
{`function (src, data, options) {
  let stacks = {
        'then': [],
        'catch': [],
        'complete': []
      },
      promises = ['then', 'catch', 'complete'],
      req = null,

  qwest = function () {
    req = Qwest.get(src, data, options)
    promises.forEach(p => {
      req[p](res => {
        stacks[p].forEach(func => {
          func(res)
        })
      })
    })
    return qwest
  }

  promises.forEach(p => {
    qwest[p] = func => {
      stacks[p].push(func)
      return qwest
    }
  })

  return qwest
}`}
          </pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
