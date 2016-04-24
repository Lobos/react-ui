'use strict';

import Regs from './regs';
import { format, toArray } from './strings';

import { getLang, setLang } from '../lang';
setLang('validation');

function handleError(label, value, key, tip) {
  // handle error
  let text = getLang('validation.tips.' + key, null);
  if (text) {
    text = (label || '') + format(text, value);
  } else {
    text = tip;
  }
  return new Error(text);
}

export function validate(value, valueType, {
  label,
  required,
  min,
  max,
  readOnly,
  sep,
  tip,
  type,
  validator,
  formData
}) {
  let len = 0;

  if (readOnly) {
     return true;
  }

  // validate required
  if (required && (value === undefined || value === null || value.length === 0)) {
    return handleError(label, value, 'required', tip);
  }

  let reg = Regs[type];

  // custom validator
  if (validator) {
    if (typeof validator === 'function') {
      validator = { func: validator };
    }
    if (validator.func) {
      return validator.func(value, formData);
    }
    if (validator.reg) {
      reg = validator.reg;
      if (typeof reg === 'string') {
        reg = new RegExp(reg);
      }
    }
  }

  // skip empty value
  if (value === undefined || value === null || value === '') {
    return true;
  }

  // validate type
  if (reg && !reg.test(value)) {
    return handleError(label, value, type, tip);
  }

  switch(valueType) {
    case 'array':
      len = toArray(value, sep).length;
    break;
    case 'number':
      len = parseFloat(value);
    break;
    default:
      len = value.length;
    break;
  }

  if (max && len > max) {
    return handleError(label, max, `max.${valueType}`, tip);
  }

  if (min && len < min) {
    return handleError(label, min, `min.${valueType}`, tip);
  }

  return true;
};
