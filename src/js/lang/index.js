var merge = require('deepmerge')
var lang = {}

module.exports = {
  set: function (obj) {
    lang = merge(lang, obj)
  },

  get: function (path) {
    if (!path || 'string' !== typeof path) return ''
    var result = lang
    path.split('.').forEach(function (p) {
      result = result[p]
    })

    return result
  }
}
