'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Nav, NavItem } from '../rctui'

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
        <h1>Nav & NavItem</h1>
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
<NavItem 
  id={string}     // unique in Nav, if not set, use index
  onClick={func}  // click callback
  grid={{width, offset, responsive}} // see Grid, only effect when Nav is inline
>
</NavItem>
`}
        </Code>

        <h2 className="subhead">pill</h2>
        <Example>
          <Nav active="foo" onSelect={onSelect} type="pill" grid={1 / 3}>
            <NavItem id="foo" onClick={onClick}>foo</NavItem>
            <NavItem id="bar">bar</NavItem>
            <NavItem id="baz" disabled>baz</NavItem>
          </Nav>
        </Example>
        <h2 className="subhead">inline pill</h2>
        <Example>
          <Nav active="bar" onSelect={onSelect} type="pill" inline>
            <NavItem id="foo" onClick={onClick}>foo</NavItem>
            <NavItem id="bar">bar</NavItem>
            <NavItem id="baz" disabled>baz</NavItem>
          </Nav>
        </Example>
        <h2 className="subhead">tab</h2>
        <Example>
          <Nav active="bar" onSelect={onSelect} type="tab">
            <NavItem id="foo" onClick={onClick}>foo</NavItem>
            <NavItem id="bar">bar</NavItem>
            <NavItem id="baz" disabled>baz</NavItem>
          </Nav>
        </Example>
        <h2 className="subhead">grid custom</h2>
        <Example>
          <Nav active="foo" onSelect={onSelect} type="pill" inline>
            <NavItem id="foo" grid={1 / 4} onClick={onClick}>foo</NavItem>
            <NavItem id="bar" grid={1 / 4}>bar</NavItem>
            <NavItem id="baz" grid={1 / 4} disabled>baz</NavItem>
          </Nav>
        </Example>
        <Example>
          <Nav active="baz" onSelect={onSelect} type="tab">
            <NavItem id="foo" grid={1 / 4} onClick={onClick}>foo</NavItem>
            <NavItem id="bar" grid={1 / 4}>bar</NavItem>
            <NavItem id="baz" grid={1 / 4}>baz</NavItem>
          </Nav>
        </Example>
      </div>
    </div>
  )
}
