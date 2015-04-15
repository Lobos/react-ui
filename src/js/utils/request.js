var superagent = require('../superagent')
var message = require('../actions/message')
var loadingActions = require('../actions/loading')
var lang = require('../lang')
var Strings = require('../utils/strings')

var Caches = {}
var TIMESTAMP = "Timestamp"


// options: {
//  success: function,
//  failure: function,
//  cache: bool,
//  async: bool, 
//  loading: bool
// }
// this function use caches
function getData(url, options) {
  options = options || {}
  var hash = Strings.hashCode(url).toString()

  // if options.cache is true, don't check timestamp, use Caches data
  if (options.cache && Caches[hash]) {
    options.success(Caches[hash])
    return
  }

  // get localstorage item
  var result
  if (localStorage) {
    result = localStorage.getItem(hash)
    if (result) {
      result = JSON.parse(result)
    }
  }

  var req = superagent.get(url)
  // set header
  if (result) req.set(TIMESTAMP, result.timestamp || '')
  if (options.async === false) req.async(false)

  // loading
  if (options.loading) loadingActions.start()

  req.end(function (err, res) {
    if (options.loading) loadingActions.end()

    if (res.body) {
      // if res.body.cache is true, res.body.data should be null
      if (res.body.cache) {
        res.body.data = result.data
      } else if(res.body.status === 1) {
        // set Caches
        Caches[hash] = res.body
        // set localstorage
        if (localStorage) {
          try {
            localStorage.setItem(hash, JSON.stringify(res.body))
          } catch(e) {
            // if localStorage is full, clear
            if (e.code === 22) localStorage.clear()
          }
        }
      }
    }
    resolve(err, res, options.success, options.failure)
  })
}

function request(method, url, options) {
  options = options || {}
  var callback = function (err, res) {
    if (options.loading) loadingActions.end()
    resolve(err, res, options.success, options.failure)
  }

  if (options.loading) loadingActions.start()

  var req = superagent(method, url)
  if (options.async === false) req.async(false)

  if (options.type) req.type(options.type)

  var sq = method === 'GET' ? 'query' : 'send'
  if (options.data) req[sq](options.data)
  req.end(callback)
}


function resolve(err, res, success, failure) {
  if (err !== null) {
    message.error(err.message)
    return
  }

  if (res.status === 200) {
    var body = res.body
    if (body && body.msg) {
      message[body.status ? 'info' : 'error'](body.msg)
    }
    if ('function' === typeof success) {
      success(res.body)
    }
  } else {
    message.error(lang.get('request.status')[res.status])
    if ('function' === typeof failure) {
      failure(res)
    }
  }
}


module.exports = {
  getData: getData,

  get: function (url, options) {
    request('GET', url, options)
  },

  post: function (url, options) {
    request('POST', url, options)
  },

  put: function (url, options) {
    request('PUT', url, options)
  },

  del: function (url, options) {
    request('DELETE', url, options)
  }
}
