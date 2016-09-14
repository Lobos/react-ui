import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import * as Events from './utils/events'
import { format, toArray } from './utils/strings'
import { getGrid } from './utils/grids'
import upload from './utils/upload'
import FormItem from './higherOrders/FormItem'

import _imgupload from './styles/_imgupload.scss'

import { getLang, setLang } from './lang'
setLang('validation', 'buttons')

class ImgUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: {}
    }
    this.addFile = this.addFile.bind(this)
    this.rotate = {}
  }

  handleChange (value) {
    const { onChange } = this.props
    if (onChange) {
      onChange(value)
    }
  }

  toArray (value) {
    if (!value) {
      return []
    }
    return toArray(value, this.props.sep || ',')
  }

  addFile () {
    const { accept, autoUpload, disabled, readOnly, fileSize } = this.props
    if (disabled || readOnly) {
      return
    }
    let thefile = this.state.file
    let file = document.createElement('input')
    file.type = 'file'
    file.accept = accept
    file.click()
    Events.on(file, 'change', () => {
      let blob = file.files[0]
      if (blob.size / 1024 > fileSize) {
        this.handleChange(new Error(format(getLang('validation.tips.fileSize'), fileSize)))
        thefile.status = 3
        this.setState({file: thefile })
        return
      }

      let reader = new FileReader()

      reader.onload = (e) => {
        let data = e.target.result
        let image = new Image()

        image.onload = () => {
          let width = image.width + ''
          let height = image.height + ''
          let size = this.props.size

          if (size) {
            size = size.split('*')
            if (size.length === 2 && (width !== size[0] || height !== size[1])) {
              this.handleChange(new Error(`图片尺寸不符合${this.props.size}`))
              thefile.status = 3
              this.setState({ file: thefile })
              return
            }
          }

          thefile = {
            file,
            name: file.files[0].name,
            status: autoUpload ? 1 : 0
          }
          if (autoUpload) {
            thefile.xhr = this.uploadFile(thefile)
          }
          this.setState({ file: thefile })
        }

        image.src = data
      }
      reader.readAsDataURL(blob)
    })
  }

  removeFile (delIndex) {
    if (this.props.disabled || this.props.readOnly) {
      return
    }
    let value = this.toArray(this.props.value)
    value.splice(delIndex, 1)
    this.handleChange(value.join())
  }

  uploadFile (thefile) {
    let { file } = thefile
    let { onUpload } = this.props
    return upload({
      url: this.props.action,
      name: this.props.name,
      cors: this.props.cors,
      params: this.props.params,
      withCredentials: this.props.withCredentials,
      file: file.files[0],
      onProgress: (e) => {
        let percent = (e.loaded / e.total)
        thefile.percent = percent * 100

        this.setState({file: thefile})
        this.rotate.style.transform = `rotate(${percent * 360}deg)`
      },
      onLoad: (e) => {
        let res = e.currentTarget.responseText
        if (onUpload) {
          res = onUpload(res)
        }

        if (res instanceof Error) {
          thefile.status = 3
          thefile.name = res.message
        } else {
          thefile.status = 2
          thefile.value = res
        }
        this.setState({ file: thefile })

        let value = this.toArray(this.props.value)
        value.push(thefile.value)
        this.handleChange(value.join())
      },
      onError: () => {
        thefile.status = 3
        this.setState({file: thefile })
        this.handleChange()
      }
    })
  }

  renderFiles () {
    let files = this.toArray(this.props.value)
    let className = classnames(
      _imgupload['imgupload-wrap'],
      _imgupload.uploaded
    )
    return files.map((value, index) => (
      <div key={value} className={className} style={{
          backgroundImage: `url(${value})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <a className={_imgupload.remove} onClick={this.removeFile.bind(this, index)}>&times; 点击删除</a>
      </div>
    ))
  }

  renderButton () {
    let {file} = this.state
    let files = this.toArray(this.props.value)
    let className = classnames(
      _imgupload['imgupload-wrap'],
      file.status === 3 && _imgupload['has-error'],
      file.status === 1 && _imgupload.uploading
    )

    if (file.status === 3) {
      return (
        <div className={className} onClick={this.addFile}>
          <div className={_imgupload.errorcont}>
            <p>请重新上传</p>
          </div>
        </div>
      )
    }

    if (file.status === 1) {
      return (
        <div className={className}>
          <div className={`${file.percent > 50 ? _imgupload.right : ''} ${_imgupload.uploading}`}>
            <div className={_imgupload.rotate} ref={(c) => { this.rotate = c }} />
            <div className={_imgupload.mask}/>
          </div>
        </div>
      )
    }

    if (files.length < this.props.limit) {
      className = classnames(
        _imgupload['imgupload-wrap'],
        files.length < this.props.limit && _imgupload.imgupload
      )
      return (<div onClick={this.addFile}>{
        this.props.content || (
          <div className={className} />
        )}</div>)
    }
  }

  render () {
    let { className, grid, style } = this.props
    className = classnames(
      getGrid(grid),
      _imgupload['imgupload-container'],
      className
    )
    return (
      <div className={className} style={style}>
        { this.renderFiles() }
        { this.renderButton() }
      </div>
    )
  }
}

ImgUpload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  autoUpload: PropTypes.bool,
  className: PropTypes.string,
  content: PropTypes.object,
  cors: PropTypes.bool,
  disabled: PropTypes.bool,
  fileSize: PropTypes.number,
  grid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  limit: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  params: PropTypes.object,
  readOnly: PropTypes.bool,
  sep: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  withCredentials: PropTypes.bool
}

ImgUpload.defaultProps = {
  autoUpload: true,
  cors: true,
  fileSize: 4096,
  limit: 1,
  withCredentials: false,
  accept: 'image/*'
}

module.exports = FormItem.register('imgupload', {valueType: 'array'}, ImgUpload)
