'use strict'

import Code from '../Code'
import Example from '../Example'
import { Button, Icon, ImgUpload } from '../rctui'
import { Cn, En } from '../Language'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>ImgUpload</h1>
        <Cn tag="h2">文件上传</Cn>
        <Cn>使用了 formdata 进行数据传输，IE10以下暂不支持，慎用。</Cn>
        <Cn>图片上传组件基于Upload进一步封装，提供上传图片后的显示图片功能。</Cn>
      </div>

      <div className="content">
        <Cn>
          <Code>
{`<ImgUpload
accept={string}         // input accept
action={string}         // 服务端地址，必填
className={string}      //
content={element}       // 显示内容
disabled={bool}         // 禁用，默认为 false
fileSize={number}       // 单个文件最大尺寸，单位 KB
limit={number}          // 最大上传文件个数，默认为 1
name={string}           // field name，必填
onUpload={func}         // 处理服务端返回的数据
readOnly={bool}         // 只读，默认为 false
params={object}
style={object}
grid={[width, responsive]} // 宽度，详见Grid
withCredentials={bool}  // xhr2 withCredentials
value={string}          //支持设置默认值，多张图片用逗号分隔
size={string}           //图片尺寸,如100*100
/>`}
          </Code>
        </Cn>
        <En>
          <Code>
{`<ImgUpload
  accept={string}         // input accept
  action={string}         // required
  className={string}      //
  disabled={bool}         // default is false
  fileSize={number}       // single file size, unit KB
  limit={number}          // default is 1
  name={string}           // field name, required
  onUpload={func}         // handle server result
  readOnly={bool}         // default false
  params={object}
  style={object}
  withCredentials={bool}  // xhr2 withCredentials
>{children}</ImgUpload>`}
          </Code>
        </En>

        <h2 className="subhead">Example</h2>
        <Example>
<ImgUpload
  name="file"
  action="/upload"
  accept="image/*"
  limit={3}
  params={{ arg: 'test' }}
  value={['images/image1.jpg', 'images/image2.jpg']}
  srcTpl={d => d}
  size="160*107"
  onUpload={(res) => {
    var json = JSON.parse(res)
    if (json.success) {
      return json.model.data
    } else {
      return new Error(json.message)
    }
  }}>
  <Button><Icon icon="upload" /> Choose a file</Button>
</ImgUpload>
        </Example>
      </div>
    </div>
  )
}
