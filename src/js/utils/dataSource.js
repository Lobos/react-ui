'use strict'

import Qwest from 'qwest'

export default function (src, options) {
  return (success, failure) => {
    Qwest.get(src, null, options)
      .then(res => success(res))
      .catch(res => {
        if (failure) {
          failure(res)
        }
      })
  }
}
