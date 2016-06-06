'use strict'

import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
const {Button, Icon, Upload} = global.uiRequire()

module.exports = class extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Upload</h1>
          <h2>文件上传</h2>
          <div>使用了 formdata 进行数据传输，IE10以下暂不支持，慎用。</div>
        </div>

        <div className="content">
          <Code>
{`<Upload
  accept={string}         // input accept
  action={string}         // 服务端地址，必填
  className={string}      //
  content={element}       // 显示内容
  disabled={bool}         // 禁用，默认为 false
  fileSize={number}       // 单个文件最大尺寸，单位 KB
  limit={number}          // 最大上传文件个数，默认为 1
  name={string}           // field name，必填
  onUpload={func}           // 处理服务端返回的数据
  readOnly={bool}         // 只读，默认为 false
  params={object}
  style={object}
  grid={[width, responsive]} // 宽度，详见Grid
  withCredentials={bool}  // xhr2 withCredentials
/>`}
          </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<Upload
  grid={1 / 2}
  name="test"
  action="http://216.189.159.94:8080/upload"
  accept="image/*"
  limit={3}
  params={{ arg: 'test' }}
  onUpload={(res) => {
    var json = JSON.parse(res) // res 是返回的responseText，需要手动转为json
    if (json.success) {
      // 如果服务端返回成功，返回value
      return json.id
    } else {
      // 如果服务端返回失败，返回一个Error
      return new Error(json.message)
    }
  }}
  content={<Button><Icon icon="upload" /> 选择文件</Button>} />
          </Example>
        </div>
      </div>
    )
  }
}
