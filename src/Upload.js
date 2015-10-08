'use strict'

import classnames from 'classnames'
import React from 'react'
import Events from './utils/events'
import { nextUid, format } from './utils/strings'
import getGrid from './higherorder/grid'
import Message from './Message'
import upload from './utils/upload'

import { requireCss } from './themes'
requireCss('upload')

import { getLang, setLang } from './lang'
setLang('validation', 'buttons')

@getGrid
export default class Upload extends React.Component {
  static displayName = 'Upload'

  static propTypes = {
    accept: React.PropTypes.string,
    action: React.PropTypes.string.isRequired,
    autoUpload: React.PropTypes.bool,
    className: React.PropTypes.string,
    content: React.PropTypes.object,
    cors: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    fileSize: React.PropTypes.number,
    limit: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    withCredentials: React.PropTypes.bool
  }

  static defaultProps = {
    autoUpload: false,
    cors: true,
    fileSize: 4096,
    limit: 1,
    withCredentials: false
  }

  state = {
    files: {}
  }

  isCompleted () {
    let completed = true,
        files = this.state.files
    Object.keys(files).forEach(id => {
      if (files[id].status !== 2) {
        completed = false
      }
    })
    return completed
  }

  getValue () {
    let values = [],
        files = this.state.files
    Object.keys(files).forEach(id => {
      if (this.props.autoUpload) {
        values.push(files[id].value)
      } else {
        values.push(files[id].file.files[0])
      }
    })
    return values
  }

  // nope
  setValue() {}

  addFile () {
    if (this.props.disabled || this.props.readOnly) {
      return
    }

    let files = this.state.files,
        file = document.createElement('input'),
        autoUpload = this.props.autoUpload
    file.type = 'file'
    file.accept = this.props.accept
    file.click()
    Events.on(file, 'change', () => {
      let blob = file.files[0]
      if (blob.size / 1024 > this.props.fileSize) {
        Message.show(format(getLang('validation.tips.fileSize'), this.props.fileSize), 'error')
        return
      }

      let id = nextUid()
      files[id] = {
        file,
        name: file.files[0].name,
        status: autoUpload ? 1 : 0
      }

      if (autoUpload) {
        files[id].xhr = this.uploadFile(file, id)
      }
      this.setState({ files })
    })
  }

  removeFile (id) {
    if (this.props.disabled || this.props.readOnly) {
      return
    }

    let files = this.state.files
    let file = files[id]
    if (file.xhr) {
      file.xhr.abort()
    }
    delete files[id]
    this.setState({ files })
  }

  uploadFile (file, id) {
    return upload({
      url: this.props.action,
      name: this.props.name,
      cors: this.props.cors,
      withCredentials: this.props.withCredentials,
      file: file.files[0],
      onProgress: (e) => {
        let progress = this.refs[id]
        progress.style.width = (e.loaded / e.total) * 100 + '%'
      },
      onLoad: (e) => {
        let files = this.state.files
        files[id].status = 2
        files[id].value = e.currentTarget.responseText
        this.setState({ files })
      },
      onError: () => {
        let files = this.state.files
        files[id].status = 3
        this.setState({ files })
      }
    })
  }

  start () {
    let files = this.state.files
    Object.keys(files).forEach(id => {
      this.uploadFile(files[id].file, id)
    })
  }

  renderFiles () {
    let files = this.state.files
    return Object.keys(files).map((id, i) => {
      let file = this.state.files[id]
      let className = classnames(
        `rct-file`,
        {
          'uploaded': file.status === 2,
          'has-error': file.status === 3
        }
      )
      return (
        <div key={i}>
          <div className={className}>
            <span>{file.name}</span>
            <a className="remove" onClick={this.removeFile.bind(this, id)}>&times; {getLang('buttons.cancel')}</a>
          </div>
          <div ref={id} className={`rct-upload-progress`}></div>
        </div>
      )
    })
  }

  render () {
    let className = classnames(
      this.getGrid(),
      `rct-upload-container`,
      this.props.className
    )
    return (
      <div className={className} style={this.props.style}>
        { Object.keys(this.state.files).length < this.props.limit && <div onClick={this.addFile.bind(this)}>{this.props.content}</div> }
        { this.renderFiles() }
      </div>
    )
  }
}

require('./FormControl').register(

  'upload',

  function (props) {
    return <Upload {...props} />
  },

  Upload,

  'array'
)
