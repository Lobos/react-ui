var Objects = require('../utils/objects')
var Strings = require('../utils/strings')
var Regs = require('../utils/regs')

var Lang = require('../lang')

var multTypes = ['checkbox-group', 'mult-select']

function getTip(key, value) {
  var text = Lang.get('validation.tips.' + key)
  if (text)
    text = Strings.format(text, value)
  return text
}

function getHint(hints, key, value, isArray) {
  key = ['minlen','maxlen'].indexOf(key) >= 0 ?
        key + (isArray ? 's' : '') :
        key

  var text = Lang.get('validation.hints.' + key)
  if (text) hints.push(Strings.format(text, value))
}

module.exports = {
  componentWillMount: function () {
    this._setHint(this.props)
  },

  componentWillReceiveProps: function (nextProps) {
    this._setHint(nextProps)
  },

  _setHint: function (props) {
    var hints = [],
        isArray = multTypes.indexOf(this.props.type) >= 0,
        keys = ['required','minlen','maxlen','max','min']

    getHint(hints, this.props.type)

    keys.forEach(function (key) {
      if (props[key])
        getHint(hints, key, props[key], isArray)
    })

    if (props['tip']) {
      hints.push(props['tip'])
    }
    this.setState({ hintText: hints.join(', ') })
  },

  validate: function (value) {
    value = value || this.getValue(true)
    var isArray = multTypes.indexOf(this.props.type) >= 0

    this.setState({ hasValue: !Objects.isEmpty(value) })

    var {
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
    if (required && (undefined === value || null === value || value.length === 0)) {
      this._validateFail('required', value)
      return false
    }

    if (this.props.onValidate && !this.props.onValidate()) {
      this._validateFail('', value)
      return false
    }

    if (undefined === value || null === value || '' === value) {
      this._validatePass()
      return true
    }

    // length
    var length = isArray ? Strings.formatValue(value, this.props.flat).length : value.length
    if (minlen && length > 0 && length < minlen) {
      this._validateFail(isArray ? 'minlens' : 'minlen', minlen)
      return false
    }

    if (maxlen && length > maxlen) {
      this._validateFail(isArray ? 'maxlens' : 'maxlen', maxlen)
      return false
    }

    // validate type
    var reg = Regs[type]
    if (reg && !reg.test(value)) {
      this._validateFail(type, value)
      return false
    }

    if (max && parseInt(value) > max) {
      this._validateFail('max', max)
      return false
    }

    if (min && parseInt(value) < min) {
      this._validateFail('min', min)
      return false
    }

    this._validatePass()
    return true
  },

  _validatePass: function () {
    this.setState({ hasError: false, errorText: '' })
  },

  _validateFail: function (type, value) {
    var text = getTip(type, value) || this.props.tip
    this.setState({ hasError: true, errorText: text })
  }
}
