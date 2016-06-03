'use strict'

import { hashcode } from './objects'

export function memoize (fn) {
  let cache = {}

  return function () {
    let key = hashcode(arguments)

    if (!(key in cache)) cache[key] = fn(...arguments)

    return cache[key]
  }
}
