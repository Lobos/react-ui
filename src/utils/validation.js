import Regs from './regs'
import { format, toArray } from './strings'
import Warning from './warning'

import { getLang, setLang } from '../lang'
setLang('validation')

function handleError (label, value, key, tip) {
  // handle error
  let text = getLang('validation.tips.' + key, null)
  if (text) {
    text = format(text, label || '', value)
  } else {
    text = tip
  }
  return new Error(text)
}

export function validate (value, valueType, formData, props, callback) {
  const { label, required, min, max, readOnly, sep, tip, type, validator } = props

  let len = 0

  if (readOnly) {
     return true
  }

  // validate required
  if (required && (value === undefined || value === null || value.length === 0)) {
    return handleError(label, value, 'required', tip)
  }

  let reg = Regs[type]

  // custom validator
  if (validator) {
    if (typeof validator === 'function') {
      return validator(value, formData)
    }
    if (validator.func) {
      return validator.func(value, formData)
    }
    if (validator.async) {
      validator.async(value, formData, (result) => {
        callback(result)
      })
      return new Warning(<span style={{color: '#f0ad4e'}}>{getLang('validation.checking')}</span>)
    }
    if (validator.reg) {
      reg = validator.reg
      if (typeof reg === 'string') {
        reg = new RegExp(reg)
      }
    }
  }

  // skip empty value
  if (value === undefined || value === null || value === '') {
    return true
  }

  // validate type
  if (reg && !reg.test(value)) {
    return handleError(label, value, type, tip)
  }

  switch (valueType) {
    case 'array':
      len = toArray(value, sep).length
    break
    case 'number':
      len = parseFloat(value)
    break
    default:
      len = value.length
    break
  }

  if (len > 0) {
    if (max && len > max) {
      return handleError(label, max, `max.${valueType}`, tip)
    }

    if (min && len < min) {
      return handleError(label, min, `min.${valueType}`, tip)
    }
  }

  return true
}
