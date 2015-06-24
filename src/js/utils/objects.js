"use strict"

let type = require('./type')
let substitute = require('./strings').substitute

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

function toTextValue(arr, textTpl='{text}', valueTpl='{id}') {
  arr = arr.map(function (s) {
    if (type(s) !== 'object') {
      return { $text: s, $value: s }
    } else {
      s.$text = substitute(textTpl, s)
      s.$value = substitute(valueTpl, s)
      return s
    }
  })
  return arr
}

module.exports = { forEach, isEmpty, toTextValue }
