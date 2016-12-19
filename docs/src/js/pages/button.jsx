import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cn } from '../Language'
import {Button, Icon} from 'rctui'

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Button</h1>
          <Cn><h2>按钮</h2></Cn>
        </div>

        <div className="content button-docs">
          <Code>
{`<Button
  className={string}
  type="string"        // string, 'submit' or 'button', default value is 'button'
  disabled={bool}
  size="string"        // 'large|middle|small', default value is 'middle'
  status="string"      // 'primary|secondary|success|warning|danger(error)|info',
                          default value is 'secondary'
  onClick={function}>
  {string|element}     // string or ReactElement
  throttle={number}    // millisecond, default value is undefined
</Button>`}
          </Code>
          <Cn>0.7 删除了once, enable(), disable(), 用props.disabled吧.</Cn>

          <h2 className="subhead">Normal</h2>
          <Example>
            <Button status="primary">Primary Button</Button>
            <Button>Default Button</Button>
          </Example>

          <h2 className="subhead">Button with Icon</h2>
          <Example>
            <Button><Icon icon="home" />Home</Button>
          </Example>

          <h2 className="subhead">Status</h2>
          <Example>
            <Button status="primary">Primary</Button>
            <Button status="success">Success</Button>
            <Button status="warning">Warning</Button>
            <Button status="danger">Danger</Button>
            <Button status="error">Error</Button>
            <Button status="info">Info</Button>
            <Button>Normal</Button>
            <Button status="link">Link</Button>
          </Example>

          <h2 className="subhead">Size</h2>
          <Example>
            <Button size="large">Large Button</Button>
            <Button>Middle Button</Button>
            <Button size="small">Small Button</Button>
          </Example>

          <h2 className="subhead">Throttle</h2>
          <Example>
            <Button onClick={() => { console.log(1111) }} throttle={3000}>Button</Button>
          </Example>

          <h2 className="subhead">disabled</h2>
          <Example>
            <Button disabled status="primary">Primary</Button>
            <Button disabled status="success">Success</Button>
            <Button disabled status="warning">Warning</Button>
            <Button disabled status="danger">Danger</Button>
            <Button disabled status="error">Error</Button>
            <Button disabled status="info">Info</Button>
            <Button disabled>Normal</Button>
            <Button disabled status="link">Link</Button>
          </Example>
        </div>
      </div>
    )
  }
}
