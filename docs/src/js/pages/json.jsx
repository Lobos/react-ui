import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { En, Cn } from '../Language'
import { Json } from 'rctui'

module.exports = () => {
  return (
    <div>
      <div className="header">
        <h1>Json</h1>
        <Cn tag="h2">Json输入框</Cn>
      </div>

      <div className="content">
        <En>
          <Code>{`
          <Json
            placeholder={string}
            readOnly={bool}         // default is false
            onChange={func(value)}  // callback on blur
            rows={number}           // same as textarea rows
            value={string|object}   // initial value
            valueType={string}      // onChange return value type, 'string|object', default value is 'string'
            grid={{width, offset, responsive}} // see Grid
          />`}
          </Code>
        </En>
        <Cn>
          <Code>{`
          <Json
            placeholder={string}
            readOnly={bool}         // 是否只读，默认值为 false
            onChange={func(value)}  // 值改变时回调函数，为了性能，blur 时才会触发 onChange 事件
            rows={number}           // 和 textarea 的 rows 相同
            value={string|object}   // 初始值
            valueType={string}      // 返回值类型，'string' 或 'object'，默认值为 'string'
            grid={{width, offset, responsive}} // 参见Grid
          />`}
          </Code>
        </Cn>


        <h2 className="subhead">return String</h2>
        <Example>
          <Json rows={10} value={'{"a": 1, "b": 2}'} onChange={(v) => console.log(v)} />
        </Example>

        <h2 className="subhead">return Object</h2>
        <Example>
          <Json rows={10} value={{a: 1, b: 2}} valueType="object" onChange={(v) => console.log(v)} />
        </Example>

      </div>
    </div>
  )
}
