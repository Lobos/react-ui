'use strict'

import merge from '../utils/merge'
let LangData = {}

export let LOCATION = 'zh-cn'

export function setLang () {
  let args = [].slice.call(arguments)
  args.forEach(function (arg) {
    if (typeof arg === 'object') {
      LangData = merge({}, LangData, arg)
    } else if (typeof arg === 'string') {
      LangData = merge({}, LangData, require(`./${LOCATION}/${arg}`))
    }
  })
}

export function getLang (path, def) {
  let result = LangData

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

export function setLocation (location) {
  LOCATION = location
  LangData = merge({}, LangData, require(`./${LOCATION}/index`))
}
