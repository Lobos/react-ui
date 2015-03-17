var request = require('../superagent')
var message = require('../components/message.jsx')
var caches = {}
var lang = require('../utils/lang')


function resolve(err, res, success, fail) {
  if (err !== null) {
    message.show(err.message, 'error')
    return
  }

  if (res.status === 200) {
    var body = res.body
    if (body && body.msg) {
      message.show(body.msg, body.status ? 'info' : 'error')
    }
    if ('function' === typeof success) {
      success(res.body)
    }
  } else {
    message.show(lang.get('request.status')[res.status], 'error')
    if ('function' === typeof fail) {
      fail(res)
    }
  }
}

function getCache(url, success, fail) {
  if (caches[url]) {
    success(caches[url])
    return
  }
  request.get(url, function (err, res) {
    resolve(err, res, success, fail)
    if (err === null && res.status === 200)
      caches[this.src] = res.body
  }.bind(this))
}

function req(method, url, data, success, fail) {
  var callback = function (err, res) {
    resolve(err, res, success, fail)
  }
  if (method === 'del')
    return request[method](url, callback)
  else
    return request[method](url, data, callback)
}


module.exports = {
  getCache: getCache,

  setCache: function (url, data) {
    caches[url] = data
  },

  get: function (url, data, success, fail) {
    return req('get', url, data, success, fail)
  },

  post: function (url, data, success, fail) {
    return req('post', url, data, success, fail)
  },

  put: function (url, data, success, fail) {
    return req('put', url, data, success, fail)
  },

  del: function (url, success, fail) {
    return req('del', url, null, success, fail)
  }
}
