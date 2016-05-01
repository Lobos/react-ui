import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Button, Icon} = global.uiRequire();

module.exports = class extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Button</h1>
          <h2>按钮</h2>
        </div>

        <div className="content button-docs">
          <Code>
{`<Button
  className={string}   // class
  type="submit|button" // 按钮类型，可选值为 submit|button ，不填默认值为 button
  disabled={bool}      // 与 button 的 disabled 属性相同
  once={bool}          // 值为 true 时，当button点击过后，状态会变更为 disabled
  status="string"      // primary|success|warning|error|info
  onClick={function}>  // 点击事件
  {string|element}     // 文字或元素
</Button>`}
          </Code>

          <h2 className="subhead">普通按钮</h2>
          <Example>
<Button style={{marginRight:5}} status="primary">Primary Button</Button>
<Button>Button</Button>
          </Example>

          <h2 className="subhead">带图标按钮</h2>
          <Example>
<Button style={{marginRight:5}}><Icon icon="home" /> Home</Button>
<Button><Icon icon="cog" /> Settings</Button>
          </Example>

          <h2 className="subhead">Status</h2>
          <Example>
<Button style={{marginRight:5}} status="primary">Primary</Button>
<Button style={{marginRight:5}} status="success">Success</Button>
<Button style={{marginRight:5}} status="warning">Warning</Button>
<Button style={{marginRight:5}} status="error">Error</Button>
<Button style={{marginRight:5}} status="info">Info</Button>
<Button>Normal Button</Button>
          </Example>

          <p>需要扩展可以添加className</p>
          <Example>
<Button className="button-large">Large Button</Button>
          </Example>

          <h2 className="subhead">once</h2>
          <Example>
<Button once={true}>只能点击一次</Button>
          </Example>

          <h2 className="subhead">disabled</h2>
          <Example>
<Button disabled style={{marginRight:5}} status="primary">Primary</Button>
<Button disabled style={{marginRight:5}} status="success">Success</Button>
<Button disabled style={{marginRight:5}} status="warning">Warning</Button>
<Button disabled style={{marginRight:5}} status="error">Error</Button>
<Button disabled style={{marginRight:5}} status="info">Info</Button>
<Button disabled>Disabled Button</Button>
          </Example>
        </div>
      </div>
    );
  }
}
