import Code from '../Code'
import Example from '../Example'
import { ImgUpload } from 'rctui'
import { Cn, En } from '../Language'

module.exports = function () {
  return (
    <div>
      <div className="header">
        <h1>ImgUpload</h1>
        <Cn tag="h2">文件上传</Cn>
      </div>

      <div className="content">
        <Cn>使用了 formdata 进行数据传输，IE10以下暂不支持，慎用。</Cn>
        <Cn>
          <Code>
{`<ImgUpload
  accept={string}         // input accept
  action={string}         // 服务端地址，必填
  className={string}      //
  fileSize={number}       // 单个文件最大尺寸，单位 KB
  imgWidth={number}       // px, 上传图片宽度
  imgHeight={number}      // px, 上传图片高度
  imgValidator={func(img)}  // 选择图片后触发，用来校验图片长宽等属性
  inputName={string}      // 服务端获取文件的name，如果没有设置，使用name字段
  limit={number}          // 最大上传文件个数，默认为 1
  name={string}           // field name，必填
  onUpload={func}         // 处理服务端返回的数据
  readOnly={bool}         // 只读，默认为 false
  params={object}
  style={object}
  withCredentials={bool}  // xhr2 withCredentials
  value={string}          // 支持设置默认值，多张图片用逗号分隔
  width={string}          // 缩略图宽度
  height={string}         // 缩略图高度
/>`}
          </Code>
        </Cn>
        <En>
          <Code>
{`<ImgUpload
  accept={string}         // input accept
  action={string}         // required
  className={string}      //
  fileSize={number}       // single file size, unit KB
  imgWidth={number}       // px, image width
  imgHeight={number}      // px, image height
  imgValidator={func(img)}  // validate image on file input change
  inputName={string}      // upload file name, if inputName not set, use name
  limit={number}          // default is 1
  name={string}           // field name, required
  onUpload={func}         // handle server result
  readOnly={bool}         // default false
  params={object}
  style={object}
  width={string}          // thumbnail width
  height={string}         // thumbnail height
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
  fileSize={100}
  params={{ arg: 'test' }}
  value={['images/image1.jpg', 'images/image2.jpg']}
  srcTpl={d => d}
  imgValidator={(img) => {
    if (img.width === 200) return true
    else return new Error('invalid image width')
  }}
  onUpload={(res) => {
    var json = JSON.parse(res)
    if (json.success) {
      return '' + json.model.content
    } else {
      return new Error(json.message)
    }
  }} />
        </Example>
      </div>
    </div>
  )
}
