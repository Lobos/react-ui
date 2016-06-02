'use strict'

import React from 'react'
import Code from '../Code'

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>FormSubmit</h1>
        <h2>表单提交按钮</h2>
      </div>

      <div className="content">
        <p><a href="#/button">Button</a> 的一个马甲，封装了一层响应 <a href="#/form">Form</a> 状态</p>
        <Code>{'<FormSubmit>{children}</FormSubmit>'}</Code>
        <p>如果children为两个元素，只会显示第一个元素内容，当按钮锁定时，显示第二个元素内容。</p>
        <Code>
{`<FormSubmit>
<span>提交</span>
<span>处理中...</span>
</FormSubmit>
`}
        </Code>

        <p>示例参见 <a href="#/form">Form</a></p>
      </div>
    </div>
  )
}
