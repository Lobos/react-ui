import { Component, PropTypes, isValidElement } from 'react'
import Quill from 'quill'
import { nextUid } from '../../utils/strings'

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
  }

  componentWillUnmount () {
    // this.editor...
  }

  handleChange () {
    this.value = this.editor.root.innerHTML
    this.props.onChange(this.value)
  }

  renderToolbar (toolbar) {
    if (typeof toolbar === 'string') {
      return <button key={toolbar} className={`ql-${toolbar}`} />
    }

    if (Array.isArray(toolbar)) {
      return toolbar.map(child => this.renderToolbar(child))
    }

    if (isValidElement(toolbar)) return toolbar

    if (typeof toolbar === 'object') {
      let key = Object.keys(toolbar)[0]
      let value = toolbar[key]

      if (Array.isArray(value)) {
        return (
          <select value={false} className={`ql-${key}`}>
          { value.map(v => <option key={v} value={v} />) }
          </select>
        )
      } else {
        return <button className={`ql-${key}`} value={value} />
      }
    }
  }

  render () {
    const { style, toolbar, height } = this.props

    return (
      <div style={style}>
        <div id={this.id}>
          {this.renderToolbar(toolbar)}
        </div>
        <div ref="editor" style={{ height }} />
      </div>
    )
  }
}

Editor.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.string,
  toolbar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  value: PropTypes.string
}

Editor.defaultProps = {
  height: 200,
  theme: 'snow'
}

Editor.childContextTypes = {
  getEditor: PropTypes.func,
  Quill: PropTypes.func
}
