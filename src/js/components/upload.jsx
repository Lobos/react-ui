'use strict'

require('../../less/upload.less')

import classnames from 'classnames'
import React from 'react'
import Events from '../utils/events'
import { getLang } from '../lang'
import { format } from '../utils/strings'
import getGrid from '../higherorder/grid'
import Message from './message.jsx'
import {cssPrefix} from '../config'
import upload from '../utils/upload'

class Progress extends React.Component {
  static displayName = 'Upload/Progress'

  static propTypes = {
    progress: React.PropTypes.number
  }

  render () {
    return (
      <div style={{width: this.props.progress}} className={`${cssPrefix}-upload-progress`}></div>
    )
  }
}

@getGrid
export default class Upload extends React.Component {
  static displayName = 'Upload'

  static propTypes = {
    accept: React.PropTypes.string,
    action: React.PropTypes.string,
    autoUpload: React.PropTypes.bool,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    fileSize: React.PropTypes.number,
    limit: React.PropTypes.number,
    name: React.PropTypes.string,
    style: React.PropTypes.object
  }

  static defaultProps = {
    autoUpload: false,
    fileSize: 4096,
    limit: 1
  }

  state = {
    files: []
  }

  addFile () {
    let files = this.state.files,
        file = document.createElement('input')
    file.type = 'file'
    file.accept = this.props.accept
    file.click()
    Events.on(file, 'change', () => {
      let blob = file.files[0]
      if (blob.size / 1024 > this.props.fileSize) {
        Message.show(format(getLang('validation.tips.fileSize'), this.props.fileSize), 'error')
        return
      }
      files.push(file)

      this.uploadFile(file)

      this.setState({ files })
    })
  }

  removeFile (i) {
    let files = this.state.files
    files.splice(i, 1)
    this.setState({ files })
  }

  uploadFile (file) {
    upload({
      url: this.props.action,
      name: this.props.name,
      file,
      onProgress: (e) => {
        console.log(e.loaded, e.total, (e.loaded / e.total) * 100)
      }
    })
  }

  renderFiles () {
    return this.state.files.map((file, i) => {
      return (
        <div key={i}>
          <div className={`${cssPrefix}-file`}>
            <span>{file.name || file.files[0].name}</span>
            <a className="remove" onClick={this.removeFile.bind(this, i)}>&times; {getLang('buttons.cancel')}</a>
          </div>
          <Progress />
        </div>
      )
    })
  }

  render () {
    let className = classnames(
      this.getGrid(),
      `${cssPrefix}-upload-container`,
      this.props.className
    )
    return (
      <div className={className} style={this.props.style}>
        { this.state.files.length < this.props.limit && <div onClick={this.addFile.bind(this)}>{this.props.children}</div> }
        { this.renderFiles() }
      </div>
    )
  }
}
