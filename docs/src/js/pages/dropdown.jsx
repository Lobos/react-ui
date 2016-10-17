import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Dropdown } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Dropdown</h1>
      </div>

      <div className="content">
        <Code>
{`<Dropdown
  className={string}
  style={object}
  onClick={func}
  right={bool}        // dropdown-menu right align, default value is false
  status={string}     // 'primary|info|warning|success|danger'
  size={string}       // 'small|middle|large', default value is 'middle'
/>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Dropdown text="Dropdown" className="foo" style={{width: '100px'}}>
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
            <hr />
            <a onClick={() => console.log('dropdown clicked.')}>Some Text</a>
          </Dropdown>
        </Example>

        <h2 className="subhead">Right Align</h2>
        <Example>
          <Dropdown right text="Dropdown right-align">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
            <a onClick={() => console.log('dropdown clicked.')}>Some Text</a>
          </Dropdown>
        </Example>

        <h2 className="subhead">Status</h2>
        <Example>
          <Dropdown status="primary" text="Primary">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown status="success" text="Success">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown status="info" text="Info">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown status="warning" text="Warning">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown status="danger" text="Danger">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
        </Example>

        <h2 className="subhead">Size</h2>
        <div>If set onClick props, will render split buttons</div>
        <Example>
          <Dropdown size="small" text="Dropdown">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown size="middle" text="Dropdown">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown size="large" text="Dropdown">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
        </Example>

        <h2 className="subhead">Split</h2>
        <div>If onClick props set, render split buttons</div>
        <Example>
          <Dropdown onClick={() => console.log('...')} text="Dropdown">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
          <Dropdown onClick={() => console.log('...')} status="success" text="Dropdown">
            <a target="_blank" href="http://github.com">Github</a>
            <a onClick={() => console.log('dropdown clicked.')}>Action</a>
          </Dropdown>
        </Example>

      </div>
    </div>
  )
}
