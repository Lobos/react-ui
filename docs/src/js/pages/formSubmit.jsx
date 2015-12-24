'use strict';

import React from 'react';
import prettify from '../prettify';

class Page extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>FormSubmit</h1>
          <h2>表单提交按钮</h2>
        </div>

        <div className="content">
          <p><a href="#/button">Button</a> 的一个马甲，封装了一层响应 <a href="#/form">Form</a> 状态</p>
          <pre className="prettyprint">{`<FormSubmit>{children}</FormSubmit>`}</pre>
          <p>如果children为两个元素，只会显示第一个元素内容，当按钮锁定时，显示第二个元素内容。</p>
          <pre className="prettyprint">
{`<FormSubmit>
  <span>提交</span>
  <span>处理中...</span>
</FormSubmit>
`}
          </pre>

          <p>示例参见 <a href="#/form">Form</a></p>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
