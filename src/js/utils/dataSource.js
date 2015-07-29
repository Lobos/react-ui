'use strict'

import Qwest from 'qwest'
import Message from '../components/message.jsx'

export default function (src, options) {
  return (success, failure) => {
    Qwest.get(src, null, options)
      .then(res => success(res))
      .catch(res => {
        if (failure) {
          failure(res)
        } else {
          Message.show(res, 'error')
        }
      })
  }
}
