// https://github.com/component/clone
/**
 * Module dependencies.
 */

import type from './type'

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key])
        }
      }
      return copy

    case 'array':
      var arr = new Array(obj.length)
      for (var i = 0, l = obj.length; i < l; i++) {
        arr[i] = clone(obj[i])
      }
      return arr

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = ''
      flags += obj.multiline ? 'm' : ''
      flags += obj.global ? 'g' : ''
      flags += obj.ignoreCase ? 'i' : ''
      return new RegExp(obj.source, flags)

    case 'date':
      return new Date(obj.getTime())

    default: // string, number, boolean, …
      return obj
  }
}

/**
 * Module exports.
 */

export default clone

