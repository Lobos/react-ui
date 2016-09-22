// https://github.com/component/clone
/**
 * Module dependencies.
 *
 * don't clone class instance, it will be trouble
 *
 * class Person {}
 * var a = new Person()
 * isEqual(a, clone(a)) // false
 */

import type from './type'

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

export default function clone (obj) {
  switch (type(obj)) {
    case 'object':
      let copy = {}
      Object.keys(obj).forEach((key) => {
        if (key.charAt(0) !== '$') {
          copy[key] = clone(obj[key])
        }
      })
      return copy

    case 'element':
      return obj.cloneNode(true)

    case 'array':
      let arr = new Array(obj.length)
      for (let i = 0, l = obj.length; i < l; i++) {
        arr[i] = clone(obj[i])
      }
      return arr

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      let flags = ''
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
