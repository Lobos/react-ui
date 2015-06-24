"use strict"

let merge = require('deepmerge')
let clone = require('../utils/clone')
let lang = {}

module.exports = {
  set: function () {
    let args = [].slice.call(arguments)
    args.forEach(function (arg) {
      if (typeof arg === 'object') {
        lang = merge(lang, arg)
      }
    })
  },

  get: function (path, def) {
    let result = clone(lang)

    if (path === undefined) {
      return result
    }

    if (!path || typeof path !== 'string') {
      return undefined
    }

    let paths = path.split('.')

    for (let i = 0, count = paths.length; i < count; i++) {
      result = result[paths[i]]
      if (result === undefined) {
        if (def !== undefined) {
          return def
        } else {
          console.warn(`${path} not found...`)
          return undefined
        }
      }
    }

    return result
  }
}
