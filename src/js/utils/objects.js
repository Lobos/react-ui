"use strict"

import type from './type'

function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj === null || obj === undefined) {
    return true
  }

  switch (type(obj)) {
    case 'nan':
      return true
    case 'array':
    case 'string':
    case 'arguments':
      return obj.length === 0
    case 'object':
      return Object.keys(obj).length === 0
    default:
      return false
  }
}

function forEach(obj, fn, context) {
  Object.keys(obj).forEach(key => fn.call(context, obj[key], key))
}

function toTextValue(arr, textKey='text', valueKey='value') {
  arr = arr.map(function (s) {
    if (type(s) !== 'object') {
      return { text: s, value: s }
    } else {
      return { text: s[textKey], value: s[valueKey] }
    }
  })
  return arr
}

export default { forEach, isEmpty, toTextValue }
