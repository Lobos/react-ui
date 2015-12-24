import React from 'react';
import prettify from '../prettify';
const {Button, Icon} = global.uiRequire();

class Page extends React.Component {
  disableExample (event) {
    let button = this.refs.button;
    if (event.target.checked) {
      button.disable(<span><Icon icon="lock" />我被禁用了</span>);
    } else {
      button.enable('我又可以使用了');
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Button</h1>
          <h2>按钮</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Button
  className={string}   // class
  type="submit|button" // 按钮类型，可选值为 submit|button ，不填默认值为 button
  disabled={bool}      // 与 button 的 disabled 属性相同
  once={bool}          // 值为 true 时，当button点击过后，状态会变更为 disabled
                       // 必须调用 enable 方法激活才能再次使用。默认值为 false
  status="string"      // 按钮类别，会为按钮添加 pure-button-[status] 的 className
  onClick={function}>  // 点击事件
  {string|element}     // 文字或元素
</Button>`}
          </pre>

          <h2 className="subhead">普通按钮</h2>
          <p>
            <Button status="primary">Primary Button</Button>{' '}
            <Button>Button</Button>
          </p>

          <pre className="prettyprint">
{`<Button status="primary">Primary Button</Button>
<Button>Button</Button>`}
          </pre>

          <h2 className="subhead">带图标按钮</h2>
          <p>
            <Button><Icon icon="home" /> Home</Button>{' '}
            <Button><Icon icon="cog" /> Settings</Button>
          </p>
          <pre className="prettyprint">{'<Button><Icon icon="home" /> Home</Button>\r<Button><Icon icon="cog" /> Settings</Button>'}</pre>

          <h2 className="subhead">Status</h2>
          <p>
            <Button status="primary">Primary Button</Button>{' '}
            <Button status="success">Success Button</Button>{' '}
            <Button status="warning">Warning Button</Button>{' '}
            <Button status="error">Error Button</Button>{' '}
            <Button status="info">Info Button</Button>{' '}
            <Button>Normal Button</Button>
          </p>

          <pre className="prettyprint">
{`<Button status="primary">Primary Button</Button>
<Button status="success">Success Button</Button>
<Button status="warning">Warning Button</Button>
<Button status="error">Error Button</Button>
<Button status="info">Info Button</Button>
<Button>Normal Button</Button>
`}
          </pre>
          <p>需要扩展可以添加className</p>
          <p>
            <Button className="button-large">Large Button</Button>
          </p>
          <pre className="prettyprint">{'<Button className="button-large">Large Button</Button>'}</pre>

          <h2 className="subhead">once</h2>
          <p>
            <Button once={true}>只能点击一次</Button>
          </p>
          <pre className="prettyprint">{'<Button once={true}>只能点击一次</Button>'}</pre>

          <h2 className="subhead">enable(elem)/disabled(elem)</h2>
          <p>两个实例方法 <em>enable</em>（启用） 和 <em>disable</em> （禁用），可以传入一个参数（字符串或者element）替换按钮内容</p>
          <p>
            <Button ref="button">Button</Button>{' '}
            <label>
              <input onClick={this.disableExample.bind(this)} type="checkbox" /> 禁用
            </label>
          </p>

          <pre className="prettyprint">
{`<Button ref="button">Button</Button>
<label>
  <input onClick={this.disableExample} type="checkbox" /> 禁用
</label>`}
          </pre>

          <pre className="prettyprint">
{`disableExample: function (event) {
  var button = this.refs.button;
  if (event.target.checked) {
    button.disable(<span><Icon icon="lock" />我被禁用了</span>);
  } else {
    button.enable("我又可以使用了");
  }
}`}
          </pre>

        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
