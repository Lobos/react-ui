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
  size="string"        // 'large|middle|small', default value 'middle'
  status="string"      // 'primary|secondary|success|warning|danger(error)|info', default value 'secondary'
  onClick={function}>  // 点击事件
  {string|element}     // 文字或元素
</Button>`}
          </Code>
          <p>0.7 remove once props, use disabled.</p>

          <h2 className="subhead">普通按钮</h2>
          <Example>
<Button status="primary">Primary Button</Button>
<Button>Default Button</Button>
          </Example>

          <h2 className="subhead">带图标按钮</h2>
          <Example>
<Button><Icon icon="home" /> Home</Button>
<Button><Icon icon="cog" /> Settings</Button>
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
    );
  }
}
