"use strict"

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

export default { format, substitute, toArray }
