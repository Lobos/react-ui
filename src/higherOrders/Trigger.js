import React from 'react'
import PropTypes from '../utils/proptypes'

export default function (Component) {
  class Trigger extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        value: props.value
      }

      this.imeLock = false
      this.handleChange = this.handleChange.bind(this)
      this.handleTrigger = this.handleTrigger.bind(this)
      this.handleCompositionStart = this.handleCompositionStart.bind(this)
      this.handleCompositionEnd = this.handleCompositionEnd.bind(this)
      this.handleCompositionUpdate = this.handleCompositionUpdate.bind(this)
    }

    componentWillReceiveProps (nextProps) {
      this.setState({ value: nextProps.value })
    }

    handleChange (value, event) {
      const { trigger } = this.props
      this.setState({ value })

      if (!this.imeLock && trigger === 'change') {
        this.props.onChange(value, event)
      }

      if (this.imeLock) this.imeLock = false
    }

    handleCompositionStart () {
      this.imeLock = true
    }

    handleCompositionEnd (event) {
      this.imeLock = false
      this.handleChange(event.target.value, event)
    }

    handleCompositionUpdate () {
      this.imeLock = true
    }

    handleTrigger (event) {
      this.props.onChange(event.target.value, event)
    }

    render () {
      const { trigger } = this.props
      const props = {
        ...this.props,
        onCompositionStart: this.handleCompositionStart,
        onCompositionUpdate: this.handleCompositionUpdate,
        onCompositionEnd: this.handleCompositionEnd,
        onChange: this.handleChange
      }

      if (trigger !== 'change') {
        const name = 'on' + trigger.charAt(0).toUpperCase() + trigger.slice(1)
        props[name] = this.handleTrigger
      }

      return <Component {...props} value={this.state.value} />
    }
  }

  Trigger.propTypes = {
    onChange: PropTypes.func,
    trigger: PropTypes.string,
    value: PropTypes.any
  }

  Trigger.defaultProps = {
    trigger: 'change'
  }

  return Trigger
}
