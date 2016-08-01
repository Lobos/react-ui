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
  active={1}  // active id
  onSelect={onSelect}  // select callback
  type='tab|pill' // item style type, default is tab
  inline // inline style for items, default value is false
         // if you choose pill item type, default value is true
  grid={{width, offset, responsive}} // see Grid 
  />
  <NavItem 
  text='foo' // item text
  onClick={onClick} // click callback
  grid={{width, offset, responsive}} // see Grid, only effect when Nav is inline
  />                    
                  `}
        </Code>

        <h2 className="subhead">pill</h2>
        <Example>
          <Nav active={1} onSelect={onSelect} type='pill' grid={1/3}>
              <NavItem text='foo' onClick={onClick}/>
              <NavItem text='bar' />
              <NavItem text='baz' />
          </Nav>
        </Example> 
        <h2 className="subhead">inline pill</h2>
        <Example>
          <Nav active={1} onSelect={onSelect} type='pill' inline>
              <NavItem text='foo' onClick={onClick}/>
              <NavItem text='bar' />
              <NavItem text='baz' />
          </Nav>
        </Example>
        <h2 className="subhead">tab</h2>
        <Example>
          <Nav active={1} onSelect={onSelect} type='tab'>
              <NavItem text='foo' onClick={onClick}/>
              <NavItem text='bar' />
              <NavItem text='baz' />
          </Nav>
        </Example> 
        <h2 className="subhead">grid custom</h2>
        <Example>
          <Nav active={1} onSelect={onSelect} type='pill' inline>
              <NavItem text='foo' onClick={onClick} grid={1/4}/>
              <NavItem text='bar' grid={1/4}/>
              <NavItem text='baz' grid={1/4}/>
          </Nav>
        </Example> 
        <Example>
          <Nav active={1} onSelect={onSelect} type='tab'>
              <NavItem text='foo' onClick={onClick} grid={1/4}/>
              <NavItem text='bar' grid={1/4}/>
              <NavItem text='baz' grid={1/4}/>
          </Nav>
        </Example> 
      </div>
    </div>
  )
}
