'use strict'

import React from 'react'
import prettify from '../prettify'
const {Button, Icon, Upload} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Upload'

  render () {
    return (
      <div>
        <div className="header">
          <h1>Upload</h1>
          <h2>文件上传</h2>
        </div>

        <div className="content">
          <div>
            <Upload width={12} name="test" action="http://216.189.159.94:8080/" accept="image/*" limit={3}>
              <Button><Icon icon="upload" /> 上传图片</Button>
            </Upload>
          </div>
        </div>
      </div>
    )
  }
}
