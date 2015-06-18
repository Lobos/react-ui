"use strict"

let merge = require('deepmerge')
let lang = {}

module.exports = {
  set: function () {
    let args = [].slice.call(arguments)
    args.forEach(function (arg) {
      lang = merge(lang, arg)
    })
  },

  get: function (path) {
    if (!path || typeof path !== 'string') {
      return undefined
    }

    let paths = path.split('.')
    let result = lang

    for (let i = 0, count = paths.length; i < count; i++) {
      result = result[paths[i]]
      if (result === undefined) {
        console.warn(`${path} not found...`)
        return undefined
      }
    }

    return result
  }
}
