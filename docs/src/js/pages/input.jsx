'use strict'

let React = require('react')
let Prettify = require('../mixins/prettify')

module.exports = React.createClass({
  displayName: 'Pages/Input',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Input</h1>
          <h2>输入框</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Input
  id={string}
  type={string}        // text, email, alpha, alphanum, password, url, textarea, number, integer
  placeholder={string} // 占位提示文字
  readOnly={bool}      // 只读，默认为 false
  rows={int}           // 当 type 为 textarea 时需要设置
  onChange={func}      // 值改变回调事件，参数为 value
  value={string}       // 初始值
/>`}
          </pre>

          <p>示例见 <a href="#/form-control">FormControl</a></p>
        </div>
      </div>
    )
  }
})
