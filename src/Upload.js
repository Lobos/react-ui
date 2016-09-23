import classnames from 'classnames'
import { Component, PropTypes } from 'react'
import * as Events from './utils/events'
import { nextUid, format } from './utils/strings'
import { getGrid } from './utils/grids'
import upload from './utils/upload'
import FormItem from './higherOrders/FormItem'

import _uploads from './styles/_upload.scss'

import { getLang } from './lang'

class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      files: {}
    }
    this.addFile = this.addFile.bind(this)
    this.files = {}
  }

  isCompleted () {
    let completed = true
    let files = this.state.files
    Object.keys(files).forEach((id) => {
      if (files[id].status !== 2) {
        completed = false
      }
    })
    return completed
  }

  getValue () {
    let values = []
    let files = this.state.files
    const { sep } = this.props
    Object.keys(files).forEach((id) => {
      values.push(files[id].value)
    })
    if (sep) {
      values = values.join(sep)
    }
    return values
  }

  handleChange (value) {
    const { onChange } = this.props
    if (value === undefined) {
      if (this.isCompleted()) {
        value = this.getValue()
      } else {
        value = new Error('')
      }
    }
    if (onChange) {
      onChange(value)
    }
  }

  addFile () {
    const { accept, autoUpload, disabled, readOnly, fileSize } = this.props
    if (disabled || readOnly) {
      return
    }

    let files = this.state.files
    let file = document.createElement('input')
    file.type = 'file'
    file.accept = accept
    file.click()
    Events.on(file, 'change', () => {
      let blob = file.files[0]
      if (blob.size / 1024 > fileSize) {
        this.handleChange(new Error(format(getLang('validation.tips.fileSize'), fileSize)))
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
    file.isDeleted = true
    this.setState({ files })
    setTimeout(() => {
      delete files[id]
      this.setState({ files })
    }, 200)
    this.handleChange()
  }

  uploadFile (file, id) {
    let { onUpload } = this.props
    return upload({
      url: this.props.action,
      name: this.props.name,
      cors: this.props.cors,
      params: this.props.params,
      withCredentials: this.props.withCredentials,
      file: file.files[0],
      onProgress: (e) => {
        let progress = this.files[id]
        progress.style.backgroundSize = (e.loaded / e.total) * 100 + '%' + ' 2px'
        this.handleChange(new Error(''))
      },
      onLoad: (e) => {
        let files = this.state.files
        let value = e.currentTarget.responseText
        if (onUpload) {
          value = onUpload(value)
        }

        if (value instanceof Error) {
          files[id].status = 3
          files[id].name = value.message
        } else {
          files[id].status = 2
          files[id].value = value
        }

        this.setState({ files })
        this.handleChange()
      },
      onError: () => {
        let files = this.state.files
        files[id].status = 3
        this.setState({ files })
        this.handleChange()
      }
    })
  }

  start () {
    let files = this.state.files
    Object.keys(files).forEach((id) => {
      this.uploadFile(files[id].file, id)
    })
  }

  renderFiles () {
    let files = this.state.files
    return Object.keys(files).map((id, i) => {
      let file = this.state.files[id]
      let className = classnames(
        _uploads.file,
        file.isDeleted && _uploads['is-deleted'],
        file.status === 2 && _uploads.uploaded,
        file.status === 3 && _uploads['has-error']
      )
      return (
        <div key={id} className={className}
          ref={(c) => { this.files[id] = c }}>
          <span>{file.name}</span>
          <a className={_uploads.remove}
            onClick={this.removeFile.bind(this, id)}>
            &times; {getLang('buttons.cancel')}
          </a>
        </div>
      )
    })
  }

  render () {
    let { className, grid, limit, style, children } = this.props
    className = classnames(
      getGrid(grid),
      _uploads.container,
      className
    )
    return (
      <div className={className} style={style}>
        { Object.keys(this.state.files).length < limit && <div onClick={this.addFile}>{children}</div> }
        { this.renderFiles() }
      </div>
    )
  }
}

Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  autoUpload: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
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
  style: PropTypes.object,
  withCredentials: PropTypes.bool
}

Upload.defaultProps = {
  autoUpload: true,
  cors: true,
  fileSize: 4096,
  limit: 1,
  withCredentials: false
}

export default FormItem.register('upload', {valueType: 'array'}, Upload)
