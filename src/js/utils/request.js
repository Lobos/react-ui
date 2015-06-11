"use strict";

var superagent = require('superagent');
var Message = require('../components/message.jsx');

function request(url, options) {
  options = options || {};
  if (options.loading) {
    loading.start();
  }

  var callback = function (err, res) {
    if (options.loading) {
      loading.end();
    }
    resolve(err, res, options.success, options.failure);
  };

  var method = options.method || 'GET';
  var req = superagent(method, url);

  if (options.type) {
    req.type(options.type);
  }

  if (options.data) {
    req[method === 'GET' ? 'query' : 'send'](options.data);
  }

  req.end(callback);
}


function resolve(err, res, success, failure) {
  if (err !== null) {
    Message.error(err.message);
    return;
  }

  if (res.status === 200) {
    var body = res.body;

    if (body && body.msg) {
      Message[body.status ? 'info' : 'warn'](body.msg);
    }

    if (typeof success === 'function') {
      success(res.body);
    }
  } else {
    //message.error(lang.get('request.status')[res.status]);
    if (typeof failure === 'function') {
      failure(res);
    }
  }
}

module.exports = request;
