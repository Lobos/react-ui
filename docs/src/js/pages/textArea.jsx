import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Textarea } from 'rctui'
import { Cn, En } from '../Language'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Textarea</h1>
        <Cn tag="h2">文本框</Cn>
      </div>

      <div className="content button-docs">
        <Cn>
          <Code>
{`<Textarea
autoHeight={bool}     // 根据输入文字长度自动调整高度，默认为false
className={string}    //
grid={object}         // 默认宽度为1，也就是 100%
onChange={func}       // 回调方法
placeholder={string}
rows={int}            // 行高，当autoHeight为true时，rows为最小行高
style={object}        //
value={string}        // 初始值
/>`}
          </Code>
        </Cn>
        <En>
          <Code>
{`<Textarea
autoHeight={bool}     // default value is false
className={string}    // 加class
grid={object}         //
onChange={func}       //
placeholder={string}
rows={int}            // if autoHeight === true，rows === minHeight
style={object}        //
value={string}        //
/>`}
          </Code>
        </En>

        <h2 className="subhead">Example</h2>
        <Example>
<Textarea grid={1 / 2} value="123123" />
        </Example>

        <h2 className="subhead">autoHeight</h2>
        <Example>
<Textarea autoHeight grid={1 / 2} rows={3} value="123123" />
        </Example>

      </div>
    </div>
  )
}
