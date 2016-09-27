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

import _styles from '../styles/_imgupload.scss'

class ImgUpload extends Component {
  constructor (props) {
    super(props)
    this.addFile = this.addFile.bind(this)
  }

  addFile () {
    let ul = this.refs.ul
    this.props.onFileAdd((id, e) => {
      let progress = ul.querySelector(`#up_pr_${id}`)
      progress.style.backgroundSize = (e.loaded / e.total) * 100 + '%' + ' 2px'
    })
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
    const { files, removeFile } = this.props
    this.files = {}

    return Object.keys(files).map(k => {
      const file = files[k]
      let className = classnames(file.status === ERROR && _styles['has-error'])
      return (
        <li key={k} id={`up_pr_${k}`} className={className}>
          <span>{file.name}</span>
          <a className={_styles.remove}
            onClick={() => removeFile(k)}>
            &times;
          </a>
        </li>
      )
    })
  }

  render () {
    const { grid, limit, style, disabled, readOnly, width, height, value, files } = this.props

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
              <div onClick={this.addFile} className={classnames(_styles['imgupload-add'], _styles['img'])} />
            </li>
          }
        </ul>
      </div>
    )
  }
}

ImgUpload.propTypes = {
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
  srcTpl: '{src}',
  height: '6rem',
  width: '6rem'
}

export default compose(
  FormItem.register('img-upload', {valueType: 'array'}),
  Upload
)(ImgUpload)
