import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Tag } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Tag</h1>
      </div>

      <div className="content">
        <Code>
{`<Tag
className={string}
style={object}
pill={bool}         // default value is false
type={string}       // 'default|primary|info|warning|success|danger', default is 'default'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Tag>default</Tag>
          <Tag type="primary">primary</Tag>
          <Tag type="info">info</Tag>
          <Tag type="success">success</Tag>
          <Tag type="warning">warning</Tag>
          <Tag type="danger">danger</Tag>
        </Example>

        <h2 className="subhead">Pill</h2>
        <Example>
          <Tag pill>default</Tag>
          <Tag pill type="primary">primary</Tag>
          <Tag pill type="info">info</Tag>
          <Tag pill type="success">success</Tag>
          <Tag pill type="warning">warning</Tag>
          <Tag pill type="danger">danger</Tag>
        </Example>
      </div>
    </div>
  )
}
