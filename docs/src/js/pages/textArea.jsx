import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Textarea} = global.uiRequire();

module.exports = class extends React.Component {

  render () {
    return (
      <div>
        <div className="header">
          <h1>Textarea</h1>
          <h2>文本框</h2>
        </div>

        <div className="content button-docs">
          <Code>
{`<Textarea
  autoHeight={bool}     // 根据输入文字长度自动调整高度，默认为false
  className={string}    // 加class
  grid={object}         // 默认宽度为1，也就是 100%
  onChange={func}       // 回调方法，实际是由trigger指定的事件触发，非change事件
  placeholder={string}
  rows={int}            // 行高，当autoHeight为true时，rows为最小行高
  style={object}        // 
  trigger={string}      // 触发onChange的事件，可选值为 blur|change|keyDown|keyUp，默认为blur
  value={string}        // 初始值
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Textarea grid={1/2} value="123123" />
          </Example>

          <h2 className="subhead">自动行高 autoHeight</h2>
          <Example>
<Textarea autoHeight grid={1/2} rows={3} value="123123" />
          </Example>

        </div>
      </div>
    );
  }
}
