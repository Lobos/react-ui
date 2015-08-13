'use strict'

let configs = {
  cssPrefix: 'rct'
}

configs.set = (key, value) => {
  if (key !== 'set') {
    configs[key] = value
  }
}

export default configs
