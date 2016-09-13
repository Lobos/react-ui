'use strict';

import { Component } from 'react';
import Code from '../Code';
import Example from '../Example';
const {ImgUpload} = global.uiRequire();

module.exports = class extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>ImgUpload</h1>
          <h2>图片上传</h2>
          <div>使用了 formdata 进行数据传输，IE10以下暂不支持，慎用。</div>
          <div>图片上传组件基于Upload进一步封装，提供上传图片后的显示图片功能。</div>
        </div>

        <div className="content">
        <Code>
{`<ImgUpload
  accept={string}         // input accept
  action={string}         // 服务端地址，必填
  className={string}      //
  content={element}       // 显示内容，详见upload
  disabled={bool}         // 禁用，默认为 false
  fileSize={number}       // 单个文件最大尺寸，单位 KB
  limit={number}          // 最大上传文件个数，默认为 1
  name={string}           // field name，必填
  onUpload={func}         // 处理服务端返回的数据
  readOnly={bool}         // 只读，默认为 false
  style={object}
  grid={[width, responsive]} // 宽度，详见Grid
  withCredentials={bool}  // xhr2 withCredentials
  value={string}          //支持设置默认值，多张图片用逗号分隔
  size={string}           //图片尺寸,如100*100
/>`}
        </Code>

          <h2 className="subhead">Example</h2>
          <Example>
<ImgUpload
  grid={1/2}
  name="test"
  action="/uploadimg"
  accept="image/*"
  limit={3}
  value="https://gw.alicdn.com/tps/TB1wz4bKVXXXXb9XXXXXXXXXXXX-212-136.png,https://gw.alicdn.com/tps/TB11ASlLXXXXXXDXFXXXXXXXXXX-175-222.png"
  size="30*30"
  onUpload={(res) => {
    var json = JSON.parse(res); // res 是返回的responseText，需要手动转为json
    if (json.success) {
      // 如果服务端返回成功，返回value
      return json.id;
    } else {
      // 如果服务端返回失败，返回一个Error
      return new Error(json.message);
    }
  }}/>
          </Example>
        </div>
      </div>
    );
  }
}
