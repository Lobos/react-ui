import { Component } from 'react'
import objectAssign from 'object-assign'
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

    addFile (onProgress) {
      const { accept, fileSize } = this.props

      let files = this.state.files
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = accept
      input.click()
      input.addEventListener('change', () => {
        let blob = input.files[0]
        if (blob.size / 1024 > fileSize) {
          this.handleChange(new Error(format(getLang('validation.tips.fileSize'), fileSize)))
          return
        }

        let id = nextUid()
        files = objectAssign({}, files, {
          [id]: {
            file: input,
            name: input.files[0].name,
            status: UPLOADING,
            xhr: this.uploadFile(id, input, onProgress.bind(null, id))
          }
        })

        this.setState({ files })
      })
    }

    uploadFile (id, file, onProgress) {
      let { onUpload, action, name, cors, params, withCredentials } = this.props
      return ajax({
        url: action,
        name,
        cors,
        params,
        withCredentials,
        file: file.files[0],
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
        onError () {
          let files = this.state.files
          files[id].status = ERROR
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
    name: PropTypes.string,
    onChange: PropTypes.func,
    onUpload: PropTypes.func,
    params: PropTypes.object,
    readOnly: PropTypes.bool,
    sep: PropTypes.func_string,
    value: PropTypes.array_string,
    withCredentials: PropTypes.bool
  }

  Upload.defaultProps = {
    value: []
  }

  return Upload
}
