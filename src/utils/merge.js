'use strict'

export default function merge (target) {
  if (target === undefined || target === null) {
    return {}
  }

  var to = Object(target)
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i]
    if (nextSource === undefined || nextSource === null) {
      continue
    }
    nextSource = Object(nextSource)

    var keysArray = Object.keys(nextSource)
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex]

      // Object.Keys can't get enumerable key
      to[nextKey] = nextSource[nextKey]
    }
  }
  return to
}
