import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Switch } from 'rctui'
import { En, Cn } from '../Language'

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Switch</h1>
          <Cn tag="h2">复选框</Cn>
        </div>

        <div className="content">
          <Cn>
            <Code>
{`<Switch
  className={string}  // class
  text="string"       // 显示的文字信息
  value={bool}        // 是否选中，提供给Form使用，默认为 false
  checked={bool}      // 是否选中，默认为 false
  readOnly={bool}     // 是否只读，默认为 false
  onChange={function} // 状态改变回调事件
/>`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Switch
  className={string}  // class
  text="string"       //
  value={bool}        // default value is false
  checked={bool}      // default value is false
  readOnly={bool}     // default value is false
  onChange={function} //
/>`}
            </Code>
          </En>

          <h2 className="subhead">Example</h2>
          <Example>
<Switch />
          </Example>

          <h2 className="subhead">Text</h2>
          <Example>
<Switch text="Yes|No" />
          </Example>

          <h2 className="subhead">Round</h2>
          <Example>
<Switch round text="Yes|No" />
          </Example>

          <h2 className="subhead">Small</h2>
          <Example>
<Switch size="small" />
<Switch size="small" round />
          </Example>

          <h2 className="subhead">Large</h2>
          <Example>
<Switch size="large" />
<Switch size="large" round />
          </Example>

          <h2 className="subhead">Readonly</h2>
          <Example>
<Switch checked readOnly />
<Switch round checked readOnly />
<Switch readOnly />
<Switch round readOnly />
          </Example>
        </div>
      </div>
    )
  }
}
