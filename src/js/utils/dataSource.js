'use strict'

import Qwest from 'qwest'

export default function (src, data, options) {
  let stacks = {
        'then': [],
        'catch': [],
        'complete': []
      },
      promises = ['then', 'catch', 'complete'],
      req = null,

  qwest = function () {
    req = Qwest.get(src, data, options)
    promises.forEach(p => {
      stacks[p].forEach(func => {
        req[p](func)
      })
    })
    return qwest
  }

  promises.forEach(p => {
    qwest[p] = func => {
      stacks[p].push(func)
      if (req) {
        req[p](func)
      }
      return qwest
    }
  })

  return qwest
}
