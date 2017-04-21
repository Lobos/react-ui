'use strict'

import PropTypes from 'prop-types'
import { combine } from './array'

const TYPES = ['array', 'bool', 'element', 'func', 'number', 'object', 'string']

let combineTypes = []
const oneOfType = {}

for (let i = 2; i <= 6; i++) {
  combineTypes = combineTypes.concat(combine(TYPES, i))
}

combineTypes.forEach((arr) => {
  oneOfType[arr.join('_')] = PropTypes.oneOfType(arr.map((key) => PropTypes[key]))
})

export default {
  ...PropTypes,

  ...oneOfType,

  datetime: oneOfType.number_object_string,

  grid: oneOfType.number_object,

  size: PropTypes.oneOf(['small', 'middle', 'large']),

  tpl: oneOfType.func_string
}
