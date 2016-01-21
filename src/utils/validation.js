'use strict';

import Regs from './regs';
import { format, toArray } from './strings';

import { getLang, setLang } from '../lang';
setLang('validation');

function handleError(value, key, tip) {
  // handle error
  let text = getLang('validation.tips.' + key, null);
  if (text) {
    text = format(text, value);
  } else {
    text = tip;
  }
  return new Error(text);
}

export function validate(value, valueType, {
  required,
  min,
  max,
  readOnly,
  sep,
  tip,
  type,
  validation,
  formData
}) {
  let len = 0;

  if (readOnly) {
     return true;
  }

  // validate required
  if (required && (value === undefined || value === null || value.length === 0)) {
    return handleError(value, 'required', tip);
  }

  // custom validation
  if (validation) {
    return validation(value, formData);
  }

  if (value === undefined || value === null || value === '') {
    return true;
  }

  // validate type
  let reg = Regs[type];
  if (reg && !reg.test(value)) {
    return handleError(value, type, tip);
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
    return handleError(max, `max.${valueType}`, tip);
  }

  if (min && len < min) {
    return handleError(min, `min.${valueType}`, tip);
  }

  return true;
};
