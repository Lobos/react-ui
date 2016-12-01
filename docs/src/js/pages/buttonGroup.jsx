import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Button, ButtonGroup } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>ButtonGroup</h1>
      </div>

      <div className="content button-docs">
        <Code>
{`<ButtonGroup
className={string}
size="string"        // 'large|middle|small', default value is 'middle'
vertical={bool}      // default value is false
>
{[Button]}           // Button
</ButtonGroup>`}
        </Code>

        <h2 className="subhead">Normal</h2>
        <Example>
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button disabled>Disabled</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Example>

        <h2 className="subhead">Vertical</h2>
        <Example>
          <ButtonGroup vertical>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button disabled>Disabled</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Example>

        <h2 className="subhead">Size</h2>
        <Example>
          <ButtonGroup size="large">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
          <br />
          <ButtonGroup size="middle">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
          <br />
          <ButtonGroup size="small">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Example>
      </div>
    </div>
  )
}
