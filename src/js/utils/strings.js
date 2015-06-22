"use strict"

let uid = ['A', '0', '0', '0']

function nextUid() {
  var index = uid.length
  var digit

  while(index) {
    index--
      digit = uid[index].charCodeAt(0)
    if (digit === 57) {
      uid[index] = 'A'
      return uid.join('')
    }
    if (digit === 90) {
      uid[index] = '0'
    } else {
      uid[index] = String.fromCharCode(digit + 1)
      return uid.join('')
    }
  }
  uid.unshift('0')
  return uid.join('')
}

function format() {
  let args = [].slice.call(arguments),
      str = args.shift()
  return str.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] !== undefined
      ? args[number]
      : match
  })
}

function substitute(str, obj) {
  return str.replace((/\\?\{([^{}]+)\}/g), function(match, name){
    if (match.charAt(0) === '\\') {
      return match.slice(1)
    }
    return (obj[name] !== null) ? obj[name] : ''
  })
}

function toArray(value, sep) {
  if (!value) {
    value = []
  }
  if (typeof value === 'string' && sep) {
    value = value.split(sep)
  } else if (!(value instanceof Array)) {
    value = [value]
  } else if (sep) {
    // if use sep, convert every value to string
    value = value.map(v=>v.toString())
  }

  return value
}

module.exports = { format, nextUid, substitute, toArray }
