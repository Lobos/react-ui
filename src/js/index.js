"use strict"

exports.Button = require('./components/button.jsx')
exports.Checkbox = require('./components/checkbox.jsx')
exports.CheckboxGroup = require('./components/checkbox-group.jsx')
exports.Icon = require('./components/icon.jsx')
exports.Message = require('./components/message.jsx')
exports.RadioGroup = require('./components/radio-group.jsx')
exports.Tree = require('./components/tree.jsx')

exports.Utils = {
  Objects: require('./utils/objects'),
  Strings: require('./utils/strings')
}

// ajax
exports.Qwest = require('qwest')
exports.Request = require('qwest') // alias

// set language
require('./lang/zh-cn')
