import { Component, PropTypes } from 'react'

class InputFile extends Component {
  click () {
    if (this.locked) return
    this.locked = true
    this.refs.input.click()

    setTimeout(() => { this.locked = false }, 500)
  }

  render () {
    return (
      <input type="file" ref="input"
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
  onChange: PropTypes.func
}

InputFile.defaultProps = {}

export default InputFile
