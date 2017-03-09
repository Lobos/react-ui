import Code from '../Code'
import Example from '../Example'
import { Cn, En } from '../Language'
import { Checkbox } from 'rctui'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>Checkbox</h1>
        <Cn tag="h2">复选框</Cn>
      </div>

      <div className="content">
        <Cn>
          <Code>
{`<Checkbox
block={bool}        // 为 true 时，diplay=block。默认为 false
className={string}  // class
value={any}         //
checkValue={any}    // 如果选中，返回checkValue，如果未选中，返回undefined
defaultValue={any}  // 默认值
checked={bool}      // 是否选中，默认为 false
readOnly={bool}     // 是否只读，默认为 false
onChange={function( // 状态改变回调事件
  value,            // 第一个参数，value
  bool              // 状态
)}
>
{children}            // any
</Checkbox>`}
          </Code>
        </Cn>
        <En>
          <Code>
{`<Checkbox
block={bool}        // if block is true, 'display: block', default is false
className={string}  // class
value={any}
checkValue={any}    // if checked is true, return checkValue, else return undefined
defaultValue={any}
checked={bool}      // default is false
readOnly={bool}     // default is false
onChange={function( // check callback
  value,            // value
  checked           // bool
)}
>
{children}            // any
</Checkbox>`}
          </Code>
        </En>
        <Cn>
          0.7 移除内部state，变为dumb组件
        </Cn>

        <h2 className="subhead">Example</h2>
        <Example>
          <Checkbox onChange={(v, c) => console.log(v, c)} value="1">somt text</Checkbox>
        </Example>

        <h2 className="subhead">Readonly</h2>
        <Example>
          <Checkbox checked readOnly>ReadOnly checked</Checkbox>
          <Checkbox readOnly>ReadOnly</Checkbox>
        </Example>
      </div>
    </div>
  )
}
