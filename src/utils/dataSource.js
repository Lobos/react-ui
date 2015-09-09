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
      req[p](res => {
        stacks[p].forEach(func => {
          func(res)
        })
      })
    })
    return qwest
  }

  promises.forEach(p => {
    qwest[p] = func => {
      stacks[p].push(func)
      return qwest
    }
  })

  return qwest
}
