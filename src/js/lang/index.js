"use strict"

import merge from 'deepmerge'
let lang = {}

export function setLang () {
  let args = [].slice.call(arguments)
  args.forEach(function (arg) {
    if (typeof arg === 'object') {
      lang = merge(lang, arg)
    }
  })
}

export function getLang (path, def) {
  let result = lang

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
        return undefined
      }
    }
  }

  return result
}
