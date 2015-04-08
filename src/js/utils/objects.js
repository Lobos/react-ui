function forEach(obj, fn, context) {
  var key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(context, obj[key], key)
    }
  }
}

module.exports = {
  forEach: forEach
}
