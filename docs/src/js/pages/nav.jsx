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
        <h1>Nav</h1>
      </div>

      <div className="content">
        <Code>
{`<Nav active={1} onSelect={onSelect} type='tab' inline>
                     <NavItem text='foo' onClick={onClick}/>
                     <NavItem text='bar' />
                     <NavItem text='baz' />
                   </Nav>`}
        </Code>

        <h2 className="subhead">Example</h2>
        <Example>
          <Nav active={1} onSelect={onSelect} type='tab' inline>
              <NavItem text='foo' onClick={onClick}/>
              <NavItem text='bar' />
              <NavItem text='baz' />
          </Nav>
        </Example>
      </div>
    </div>
  )
}
