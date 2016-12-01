import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import { nextUid, format } from '../utils/strings'
import { deepEqual } from '../utils/objects'
import { getLang } from '../lang'
import ajax from './ajax'
import { UPLOADING, ERROR } from './status'

export default function (Origin) {
  class Upload extends Component {
    constructor (props) {
      super(props)
      this.state = {
        files: {},
        value: props.value
      }

      this.addFile = this.addFile.bind(this)
      this.removeFile = this.removeFile.bind(this)
      this.removeValue = this.removeValue.bind(this)
    }

    componentWillReceiveProps (nextProps) {
      if (!deepEqual(nextProps.value, this.props.value) &&
          !deepEqual(nextProps.value, this.state.value)) {
        this.setState({ value: nextProps.value })
      }
    }

    handleChange (value) {
      if (value === undefined) {
        if (Object.keys(this.state.files).length === 0) {
          value = this.state.value
        } else {
          value = new Error('')
        }
      }
      this.props.onChange(value)
    }

    addFile (input, onProgress, handle) {
      const { fileSize } = this.props
      let files = {...this.state.files}

      for (let i = 0; i < input.files.length; i++) {
        let blob = input.files[i]

        let id = nextUid()
        let file = {
          name: blob.name,
          status: UPLOADING
        }

        files[id] = file

        if (blob.size / 1024 > fileSize) {
          let message = format(getLang('validation.tips.fileSize'), '', fileSize)
          file.status = ERROR
          file.message = message
          file.name = message
          this.setState({ files })
          return
        }

        if (handle) {
          handle(files[id], blob, (f) => {
            if (f.status !== ERROR) {
              f.xhr = this.uploadFile(id, blob, onProgress.bind(this, id))
            }
            this.setState({ files })
          })
        } else {
          file.xhr = this.uploadFile(id, blob, onProgress.bind(this, id))
          this.setState({ files })
        }
      }
    }

    uploadFile (id, file, onProgress) {
      let { onUpload, action, name, inputName, cors, params, withCredentials } = this.props

      return ajax({
        url: action,
        name: inputName || name,
        cors,
        params,
        withCredentials,
        file,
        onProgress,

        onLoad: (e) => {
          let files = this.state.files
          let value = e.currentTarget.responseText
          if (onUpload) {
            value = onUpload(value)
          }

          if (value instanceof Error) {
            files[id].status = ERROR
            files[id].name = value.message
            files[id].message = value.message
            this.setState({ files }, this.handleChange)
          } else {
            // remove file
            delete this.state.files[id]
            // add value
            this.setState({
              value: [...this.state.value, value]
            }, this.handleChange)
          }
        },

        onError: () => {
          let files = this.state.files
          files[id].status = ERROR
          files[id].message = getLang('fetch.status.error')
          this.setState({ files })
          this.handleChange()
        }
      })
    }

    removeFile (id) {
      let files = this.state.files
      let file = files[id]
      if (file.xhr) {
        file.xhr.abort()
      }
      delete files[id]
      this.setState({ files })

      this.handleChange()
    }

    removeValue (index) {
      let value = [
        ...this.state.value.slice(0, index),
        ...this.state.value.slice(index + 1)
      ]
      this.setState({ value }, this.handleChange)
    }

    render () {
      const { files, value } = this.state
      return (
        <Origin {...this.props}
          files={files}
          value={value}
          onFileAdd={this.addFile}
          removeFile={this.removeFile}
          removeValue={this.removeValue}
        />
      )
    }
  }

  Upload.propTypes = {
    accept: PropTypes.string,
    action: PropTypes.string.isRequired,
    cors: PropTypes.bool,
    disabled: PropTypes.bool,
    fileSize: PropTypes.number,
    inputName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onUpload: PropTypes.func,
    params: PropTypes.object,
    readOnly: PropTypes.bool,
    sep: PropTypes.func_string,
    srcTpl: PropTypes.func_string,
    value: PropTypes.array_string,
    withCredentials: PropTypes.bool
  }

  Upload.defaultProps = {
    srcTpl: d => d,
    value: []
  }

  return Upload
}
