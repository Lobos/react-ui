"use strict";

var merge = require('deepmerge');
var lang = {};

module.exports = {
  set: function (obj) {
    lang = merge(lang, obj);
  },

  get: function (path) {
    if (!path || typeof path !== 'string') {
      return '';
    }
    var result = lang;
    path.split('.').forEach(function (p) {
      if (result) {
        result = result[p];
      }
    });

    return result;
  }
};
