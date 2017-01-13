import React, { Component, isValidElement } from 'react'
import PropTypes from '../../utils/proptypes'
import Quill from 'quill'
import { nextUid } from '../../utils/strings'
import { getGrid } from '../../utils/grids'

export default class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)

    this.id = nextUid()
    this.editor = null
  }

  getChildContext () {
    const self = this
    return {
      getEditor () { return self.editor },
      Quill
    }
  }

  componentDidMount () {
    const { value, theme, placeholder, readOnly } = this.props

    let editor = this.editor = new Quill(this.refs.editor, {
      modules: { toolbar: `#${this.id}` },
      placeholder,
      readOnly,
      theme
    })

    if (value) editor.clipboard.dangerouslyPasteHTML(value)

    editor.on('text-change', this.handleChange)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.value) {
      this.editor.clipboard.dangerouslyPasteHTML(nextProps.value)
    }
    if (nextProps.readOnly !== this.props.readOnly) {
      this.editor.enable(!nextProps.readOnly)
    }
  }

  componentWillUnmount () {
    // this.editor...
  }

  handleChange () {
    this.value = this.editor.root.innerHTML
    this.props.onChange(this.value)
  }

  renderToolbar (toolbar, index) {
    if (typeof toolbar === 'string') {
      return <button key={toolbar} className={`ql-${toolbar}`} />
    }

    if (Array.isArray(toolbar)) {
      return <span key={index}>{toolbar.map((child, i) => this.renderToolbar(child, i))}</span>
    }

    if (isValidElement(toolbar)) return toolbar

    if (typeof toolbar === 'object') {
      let key = Object.keys(toolbar)[0]
      let value = toolbar[key]

      if (Array.isArray(value)) {
        return (
          <select key={`${key}-${index}`} value={false} className={`ql-${key}`}>
          { value.map((v, i) => v === false ? <option key={i} /> : <option key={i} value={v} />) }
          </select>
        )
      } else {
        return <button key={`${key}-${index}`} className={`ql-${key}`} value={value} />
      }
    }
  }

  render () {
    const { style, toolbar, grid, height } = this.props

    let className = getGrid(grid)

    return (
      <div style={style} className={className}>
        <div id={this.id}>
          {this.renderToolbar(toolbar)}
        </div>
        <div ref="editor" style={{ height }} />
      </div>
    )
  }
}

Editor.propTypes = {
  grid: PropTypes.grid,
  height: PropTypes.number_string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.string,
  toolbar: PropTypes.array_element_object,
  value: PropTypes.string
}

Editor.defaultProps = {
  height: 200,
  theme: 'snow',
  toolbar: [
    [{ header: ['1', '2', '3', false] }],
    ['bold', 'italic', 'underline', 'link'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
}

Editor.childContextTypes = {
  getEditor: PropTypes.func,
  Quill: PropTypes.func
}
