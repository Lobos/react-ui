function hashCode(str){
  var hash = 0
  var chr
  if (str.length === 0) return hash
  for (var i = 0, count=str.length; i < count; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

function format() {
  var args = [].slice.call(arguments),
      str = args.shift()
  return str.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] !== undefined
      ? args[number]
      : match
  })
}

function substitute(str, obj) {
  return str.replace((/\\?\{([^{}]+)\}/g), function(match, name){
    if (match.charAt(0) === '\\') return match.slice(1)
    return (obj[name] !== null) ? obj[name] : ''
  })
}

function formatValue(value, flat) {
  if (!value) value = []
  if ('string' === typeof value && flat) {
    value = value.split(',')
  } else if (!(value instanceof Array)) {
    value = [value]
  } 
  
  if(flat) {
    var temp = []
    value.forEach(function (v) {
      temp.push(v.toString())
    })
    value = temp
  }
  return value
}

module.exports = {
  format,
  formatValue: formatValue, 
  hashCode: hashCode,
  substitute: substitute
}
