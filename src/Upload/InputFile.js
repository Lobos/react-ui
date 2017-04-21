import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'

class InputFile extends Component {
  click () {
    if (this.locked) return
    this.locked = true

    this.refs.input.value = ''
    this.refs.input.click()

    setTimeout(() => { this.locked = false }, 200)
  }

  render () {
    return (
      <input type="file" ref="input"
        multiple={this.props.multiple}
        accept={this.props.accept}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          opacity: 0
        }}
        onChange={this.props.onChange} />
      )
  }
}

InputFile.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func
}

InputFile.defaultProps = {
  multiple: false
}

export default InputFile
