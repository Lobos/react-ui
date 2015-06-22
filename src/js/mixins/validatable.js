'use strict'

let Objects = require('../utils/objects')
let Strings = require('../utils/strings')
let Regs = require('../utils/regs')

let Lang = require('../lang')

let multTypes = ['checkbox-group', 'mult-select']

function getTip(key, value) {
  let text = Lang.get('validation.tips.' + key)
  if (text) {
    text = Strings.format(text, value)
  }
  return text
}

function getHint(hints, key, value, isArray) {
  key = ['minlen', 'maxlen'].indexOf(key) >= 0 ?
        key + (isArray ? 's' : '') :
        key

  let text = Lang.get('validation.hints.' + key)
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
    let hints = [],
        isArray = multTypes.indexOf(this.props.type) >= 0,
        keys = ['required', 'minlen', 'maxlen', 'max', 'min']

    getHint(hints, this.props.type)

    keys.forEach(function (key) {
      if (props[key]) {
        getHint(hints, key, props[key], isArray)
      }
    })

    if (props.tip) {
      hints.push(props.tip)
    }
    this.setState({ hintText: hints.join(', ') })
  },

  validate: function (value) {
    value = value || this.getValue(null)
    let isArray = multTypes.indexOf(this.props.type) >= 0

    this.setState({ hasValue: !Objects.isEmpty(value) })

    let {
      required,
      min,
      max,
      minlen,
      maxlen,
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

    // length
    let length = isArray ? Strings.formatValue(value, this.props.sep).length : value.length
    if (minlen && length > 0 && length < minlen) {
      this.$validateFail(isArray ? 'minlens' : 'minlen', minlen)
      return false
    }

    if (maxlen && length > maxlen) {
      this.$validateFail(isArray ? 'maxlens' : 'maxlen', maxlen)
      return false
    }

    // validate type
    let reg = Regs[type]
    if (reg && !reg.test(value)) {
      this.$validateFail(type, value)
      return false
    }

    if (max && parseInt(value) > max) {
      this.$validateFail('max', max)
      return false
    }

    if (min && parseInt(value) < min) {
      this.$validateFail('min', min)
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

