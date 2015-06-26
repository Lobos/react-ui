'use strict'

let Objects = require('../utils/objects')
let Strings = require('../utils/strings')
let Regs = require('../utils/regs')

let Lang = require('../lang')

function getTip(key, value) {
  let text = Lang.get('validation.tips.' + key, null)
  if (text) {
    text = Strings.format(text, value)
  }
  return text
}

function getHint(hints, key, value) {
  let text = Lang.get('validation.hints.' + key, null)
  if (text) {
    hints.push(Strings.format(text, value))
  }
}

module.exports = {
  componentWillMount: function () {
    this.$setHint(this.props)
  },

  componentWillReceiveProps: function (nextProps) {
    this.$setHint(nextProps)
  },

  $setHint: function (props) {
    if (props.tip) { 
      this.setState({ hintText: props.tip })
      return
    }

    let hints = []

    if (props.required) { getHint(hints, 'required') }
    getHint(hints, this.props.type)
    if (props.min) { getHint(hints, `min.${this.state.valueType}`, props.min) }
    if (props.max) { getHint(hints, `max.${this.state.valueType}`, props.max) }

    this.setState({ hintText: hints.join(', ') })
  },

  validate: function (value) {
    value = value || this.getValue(null)

    this.setState({ hasValue: !Objects.isEmpty(value) })

    let {
      required,
      min,
      max,
      readOnly,
      type
    } = this.props

    if (readOnly) {
      return true
    }

    // validate require
    if (required && (value === undefined || value === null || value.length === 0)) {
      this.$validateFail('required', value)
      return false
    }

    if (this.props.onValidate && !this.props.onValidate()) {
      this.$validateFail('', value)
      return false
    }

    if (value === undefined || value === null || value === '') {
      this.$validatePass()
      return true
    }

    // validate type
    let reg = Regs[type]
    if (reg && !reg.test(value)) {
      this.$validateFail(type, value)
      return false
    }

    let len = 0
    let valueType = this.state.valueType

    switch(valueType) {
      case 'array':
        len = Strings.toArray(value, this.props.sep).length
      break
      case 'number':
        len = parseFloat(value)
      break
      default:
        len = value.length
      break
    }

    if (max && len > max) {
      this.$validateFail(`max.${valueType}`, max)
      return false
    }

    if (min && len < min) {
      this.$validateFail(`min.${valueType}`, min)
      return false
    }

    this.$validatePass()
    return true
  },

  $validatePass: function () {
    this.setState({ hasError: false, errorText: '' })
  },

  $validateFail: function (type, value) {
    let text = getTip(type, value) || this.props.tip
    this.setState({ hasError: true, errorText: text })
  }
}

