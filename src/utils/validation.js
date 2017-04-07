import Regs from './regs'
import { format, toArray } from './strings'
import Warning from './warning'
import { isEmpty } from './objects'

import { getLang } from '../lang'

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

  // skip empty value
  if (value === undefined || value === null || value === '' || isEmpty(value)) {
    return true
  }

  let reg = Regs[type]

  // validate type
  if (reg && !reg.test(value)) {
    return handleError(label, value, type, tip)
  }

  // json type
  if (type === 'json') {
    // In the second stage, we run the text against
    // regular expressions that look for non-JSON patterns. We are especially
    // concerned with '()' and 'new' because they can cause invocation, and '='
    // because it can cause mutation. But just to be safe, we want to reject all
    // unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace all backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
    if (/^[\],:{}\s]*$/.test(value.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      try {
        JSON.parse(value)
      } catch (e) {
        return handleError(label, value, type, tip)
      }
    } else {
      return handleError(label, value, type, tip)
    }
  }

  if (valueType === 'datetime') return true

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

  if (max && len > max) {
    return handleError(label, max, `max.${valueType}`, tip)
  }

  if (min && len < min) {
    return handleError(label, min, `min.${valueType}`, tip)
  }

  // custom validator
  if (validator) {
    if (typeof validator === 'function') {
      return validator(value, formData)
    }
    if (validator.func) {
      return validator.func(value, formData)
    }
    if (validator.async) {
      setTimeout(() => {
        validator.async(value, formData, callback)
      }, 0)
      return new Warning(<span style={{color: '#f0ad4e'}}>{getLang('validation.checking')}</span>)
    }
    if (validator.reg) {
      reg = validator.reg
      if (typeof reg === 'string') {
        reg = new RegExp(reg)
      }

      if (!reg.test(value)) {
        return handleError(label, value, type, tip)
      }
    }
  }

  return true
}
