import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { En, Cn } from '../Language'
import { Input, Icon, Button, InputGroup } from 'rctui'

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Input</h1>
        <Cn tag="h2">输入框</Cn>
      </div>

      <div className="content">
        <Code>
{`<Input
  id={string}
  type={string}        // text, email, alpha, alphanum, password, url, number, integer
  placeholder={string}
  readOnly={bool}      // default is false
  trigger={string}     // 'blur|change|keyDown|keyUp', default is 'change'
  onChange={func}      // callback on trigger
  size="string"        // 'large|middle|small', default value is 'middle'
  value={string}       // initial value
  grid={{width, offset, responsive}} // see Grid
/>`}
        </Code>
        <Cn>0.6 textarea 不再包含在Input中</Cn>

        <h2 className="subhead">onChange(value, event)</h2>
        <Cn>onChagne的回调参数，第一个参数是value，第二参数是event</Cn>
        <En>first argument is value, second is event.</En>

        <h2 className="subhead">Example</h2>
        <Example>
<Input grid={1 / 4} placeholder="text" /><br />
<Input type="integer" grid={1 / 6} placeholder="integer" /><br />
<Input readOnly grid={1 / 4} placeholder="readOnly" /><br />
<Input value="init value" grid={1 / 4} onChange={(value) => console.log(value)} placeholder="none" /><br />
<Input value="change trigger" trigger="change" onChange={(value) => console.log(value)} grid={1 / 3} />
        </Example>

        <h2 className="subhead">Size</h2>
        <Example>
<Input grid={1 / 4} size="small" placeholder="small" />
<Input grid={1 / 4} placeholder="middle" />
<Input grid={1 / 4} size="large" placeholder="large" />
        </Example>

        <h2 className="subhead">InputGroup</h2>
        <Code>
{`<InputGroup
  className="string"
  size="string"        // 'large|middle|small', default value is 'middle'
  grid={{width, offset, responsive}} // 宽度，详见Grid
>
  'string'             // addon text
  <Input />            // Input Element
  <Button />           // Button Element
</InputGroup>`}
        </Code>

        <Example>
<InputGroup grid={1 / 2}>
  text
  <Input placeholder="front addon" />
</InputGroup>

<InputGroup grid={1 / 2}>
  <Input placeholder="end addon" />
  end
</InputGroup>

<InputGroup grid={1 / 2}>
  front
  <Input />
  end
</InputGroup>

<InputGroup grid={1 / 2}>
  <Icon icon="email" />
  <Input placeholder="email" />
</InputGroup>

<InputGroup grid={1 / 2}>
  <Input placeholder="button" />
  <Button status="primary">button</Button>
</InputGroup>
        </Example>

        <h2 className="subhead">InputGroup size</h2>
        <Example>
<InputGroup size="large">
  large
  <Input placeholder="large input" />
  <Button status="primary">button</Button>
</InputGroup>

<InputGroup size="middle" grid={3 / 4}>
  middle
  <Input placeholder="middle input" />
  <Button status="primary">button</Button>
</InputGroup>

<InputGroup size="small" grid={1 / 2}>
  small
  <Input placeholder="small input" />
  <Button status="primary">button</Button>
</InputGroup>
        </Example>

        <Cn>更多示例见 <a href="#/formControl">FormControl</a></Cn>
      </div>
    </div>
  )
}
