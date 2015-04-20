// Speed up calls to hasOwnProperty
var hasProperty = Object.prototype.hasOwnProperty

function isEmpty(obj) {

  // null and undefined are "empty"
  if (!obj) return true

  if (typeof obj === 'number') return false

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false
  if (obj.length === 0)  return true

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasProperty.call(obj, key)) return false
  }

  return true
}

function forEach(obj, fn, context) {
  var key
  for (key in obj) {
    if (hasProperty.call(obj, key)) {
      fn.call(context, obj[key], key)
    }
  }
}

function clone(item) {
  if (!item) { return item } // null, undefined values check

  var types = [ Number, String, Boolean ], 
  result

  // normalizing primitives if someone did new String('aaa'), or new Number('444')
  types.forEach(function(type) {
    if (item instanceof type) {
      result = type( item )
    }
  })

  if (typeof result === "undefined") {
    if (Object.prototype.toString.call( item ) === "[object Array]") {
      result = []
      item.forEach(function(child, index) { 
        result[index] = clone( child )
      })
    } else if (typeof item === "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode === "function") {
        result = item.cloneNode( true )    
      } else if (!item.prototype) { // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item)
        } else {
          // it is an object literal
          result = {}
          for (var i in item) {
            result[i] = clone( item[i] )
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor()
        } else {
          result = item
        }
      }
    } else {
      result = item
    }
  }

  return result
}


function toTextValue(arr) {
  var kv = []
  arr.forEach(function (s) {
    kv.push({ text: s, value: s })
  })
  return kv
}


module.exports = {
  forEach: forEach,
  isEmpty: isEmpty,
  clone: clone,
  toTextValue: toTextValue
}
