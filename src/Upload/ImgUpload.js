import { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import { getGrid } from '../utils/grids'
import { compose } from '../utils/compose'
import { substitute } from '../utils/strings'
import FormItem from '../higherOrders/FormItem'
import { getLang } from '../lang'
import Upload from './Upload'
import { ERROR } from './status'
import InputFile from './InputFile'

import _styles from '../styles/_imgupload.scss'

class ImgUpload extends Component {
  constructor (props) {
    super(props)
    this.addFile = this.addFile.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  addFile () {
    this.refs.input.click()
  }

  handleFileChange (e) {
    const input = e.target
    let ul = this.refs.ul
    this.props.onFileAdd(
      input,

      (id, e) => {
        let progress = ul.querySelector(`#up_mask_${id}`)
        if (progress) {
          progress.style.height = (1 - e.loaded / e.total) * 100 + '%'
        }
      },

      (file, blob, callback) => {
        let reader = new FileReader()

        reader.onload = (e) => {
          let data = e.target.result
            /*
          let image = new Image()

          image.onload = () => {
            let width = image.width + ''
            let height = image.height + ''
            let size = this.props.size

            if (size) {
              size = size.split('*')
              if (size.length === 2 && (width !== size[0] || height !== size[1])) {
                this.handleChange(new Error(`图片尺寸不符合${this.props.size}`))
                file.status = 3
                return
              }
            }
          }

          image.src = data
            */
          file.url = data
          callback(file)
        }
        reader.readAsDataURL(blob)
      }
    )
  }

  renderValues () {
    const { value, srcTpl, width, height, removeValue } = this.props
    return value.map((v, i) => {
      let url = substitute(srcTpl, v)
      return (
        <li key={i} style={{width, height}}>
          <div className={_styles.img} style={{backgroundImage: `url(${url})`}}>
            <a href="javascript:;" onClick={() => removeValue(i)}>
              <span>{getLang('buttons.remove')} &times;</span>
            </a>
          </div>
        </li>
      )
    })
  }

  renderFiles () {
    const { files, removeFile, width, height } = this.props

    return Object.keys(files).map(k => {
      const file = files[k]
      let className = classnames(file.status === ERROR && _styles['has-error'])

      let text = file.status === ERROR ? file.message : getLang('buttons.remove')

      return (
        <li key={k} style={{width, height}} className={className}>
          <div className={_styles.img} style={{backgroundImage: `url(${file.url})`}}>
            <div className={_styles.mask} id={`up_mask_${k}`} />
            <a href="javascript:;" onClick={() => removeFile(k)}>
              <span>{text} &times;</span>
            </a>
          </div>
        </li>
      )
    })
  }

  render () {
    const { accept, grid, limit, style, disabled, readOnly, width, height, value, files } = this.props

    let className = classnames(
      this.props.className,
      getGrid(grid),
      _styles.imgupload
    )

    const allowAdd = !disabled && !readOnly && (value.length + Object.keys(files).length) < limit

    return (
      <div className={className} style={style}>
        <ul ref="ul">
          { this.renderValues() }
          { this.renderFiles() }
          {
            allowAdd &&
            <li style={{width, height}}>
              <InputFile ref="input" accept={accept} onChange={this.handleFileChange} />
              <div onClick={this.addFile} className={classnames(_styles['imgupload-add'], _styles['img'])} />
            </li>
          }
        </ul>
      </div>
    )
  }
}

ImgUpload.propTypes = {
  accept: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  files: PropTypes.object,
  grid: PropTypes.grid,
  height: PropTypes.number_string,
  limit: PropTypes.number,
  onFileAdd: PropTypes.func,
  readOnly: PropTypes.bool,
  removeFile: PropTypes.func,
  removeValue: PropTypes.func,
	srcTpl: PropTypes.func_string,
  style: PropTypes.object,
  value: PropTypes.array,
  width: PropTypes.number_string
}

ImgUpload.defaultProps = {
  accept: 'image/*',
  height: '6rem',
  width: '6rem'
}

export default compose(
  FormItem.register('img-upload', {valueType: 'array'}),
  Upload
)(ImgUpload)
