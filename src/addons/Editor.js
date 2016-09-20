import { Component, PropTypes } from 'react'
import Quill from 'quill'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'

import 'quill/dist/quill.snow.css'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const { theme, placeholder, modules } = this.props

    let editor = this.editor = new Quill(this.refs.editor, {
      modules,
      placeholder,
      theme
    })

    editor.on('text-change', this.handleChange)
  }

  componentWillUnmount () {
    // this.editor...
  }

  handleChange () {
    this.props.onChange(this.editor.root.innerHTML)
  }

  render () {
    const { style } = this.props

    return <div ref="editor" style={style} />
  }
}

Editor.propTypes = {
  modules: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string
}

Editor.defaultProps = {
  theme: 'snow'
}

export default compose(
  FormItem.register('editor', {})
)(Editor)
