import { Component, PropTypes } from 'react'
import Quill from 'quill'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'

import 'quill/dist/quill.snow.css'

(function () {
  let BlockEmbed = Quill.import('blots/block/embed')

  class ImageBlot extends BlockEmbed {
    static create (value) {
      let node = super.create()
      node.setAttribute('alt', value.alt)
      node.setAttribute('src', value.url)
      return node
    }

    static value (node) {
      return {
        alt: node.getAttribute('alt'),
        url: node.getAttribute('src')
      }
    }
  }
  ImageBlot.blotName = 'image-blot'
  ImageBlot.tagName = 'img'
  Quill.register(ImageBlot)
})()

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const { value, theme, placeholder, readOnly, toolbar, getEditor } = this.props

    let editor = this.editor = new Quill(this.refs.editor, {
      modules: { toolbar },
      placeholder,
      readOnly,
      theme
    })

    if (value) editor.clipboard.dangerouslyPasteHTML(value)

    editor.on('text-change', this.handleChange)

    getEditor && getEditor(editor)
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

  render () {
    const { style } = this.props

    return <div ref="editor" style={style} />
  }
}

Editor.propTypes = {
  getEditor: PropTypes.func,
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
  theme: 'snow',
  style: { height: 200 }
}

export default compose(
  FormItem.register('editor', {})
)(Editor)
