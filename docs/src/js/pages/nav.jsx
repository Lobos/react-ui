import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Nav } from 'rctui'

const onSelect = (key) => {
  console.log(key)
}

const onClick = () => {
  console.log('click me')
}

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Nav</h1>
      </div>

      <div className="content">
        <Code>
{`<Nav
  active={string}  // active id
  onSelect={func}  // select callback
  type='tab|pill'  // item style type, default is tab
  inline={bool}    // inline style for items, default value is false
                   // if you choose tab item type, default value is true
  grid={{width, offset, responsive}} // see Grid
/>
<Nav.Item
  id={string}     // unique in Nav, if not set, use index
  onClick={func}  // click callback
  grid={{width, offset, responsive}} // see Grid, only effect when Nav is inline
>
</Nav.Item>
`}
        </Code>

        <h2 className="subhead">pill</h2>
        <Example>
          <Nav active="foo" onSelect={onSelect} type="pill" grid={1 / 3}>
            <Nav.Item id="foo" onClick={onClick}>foo</Nav.Item>
            <Nav.Item id="bar">bar</Nav.Item>
            <Nav.Item id="baz" disabled>baz</Nav.Item>
          </Nav>
        </Example>
        <h2 className="subhead">inline pill</h2>
        <Example>
          <Nav active="bar" onSelect={onSelect} type="pill" inline>
            <Nav.Item id="foo" onClick={onClick}>foo</Nav.Item>
            <Nav.Item id="bar">bar</Nav.Item>
            <Nav.Item id="baz" disabled>baz</Nav.Item>
          </Nav>
        </Example>
        <h2 className="subhead">tab</h2>
        <Example>
          <Nav active="bar" onSelect={onSelect} type="tab">
            <Nav.Item id="foo" onClick={onClick}>foo</Nav.Item>
            <Nav.Item id="bar">bar</Nav.Item>
            <Nav.Item id="baz" disabled>baz</Nav.Item>
          </Nav>
        </Example>
        <h2 className="subhead">grid custom</h2>
        <Example>
          <Nav active="foo" onSelect={onSelect} type="pill" inline>
            <Nav.Item id="foo" grid={1 / 4} onClick={onClick}>foo</Nav.Item>
            <Nav.Item id="bar" grid={1 / 4}>bar</Nav.Item>
            <Nav.Item id="baz" grid={1 / 4} disabled>baz</Nav.Item>
          </Nav>
        </Example>
      </div>
    </div>
  )
}
