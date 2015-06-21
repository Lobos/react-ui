"use strict"

exports.Checkbox = require('./components/checkbox.jsx')
exports.CheckboxGroup = require('./components/checkbox-group.jsx')
exports.Datetime = require('./components/datetime.jsx')
exports.Icon = require('./components/icon.jsx')
exports.RadioGroup = require('./components/radio-group.jsx')
exports.Rating = require('./components/rating.jsx')
exports.Select = require('./components/select.jsx')
exports.Tree = require('./components/tree.jsx')
exports.Button = require('./components/button.jsx')
exports.FormControl = require('./components/form-control.jsx')

exports.Message = require('./components/message.jsx')
exports.Lang = require('./lang')

exports.Utils = {
  Datetime: require('./utils/datetime'),
  Objects: require('./utils/objects'),
  Strings: require('./utils/strings')
}

// ajax
exports.Qwest = require('qwest')
exports.Request = require('qwest') // alias

// set language
require('./lang/zh-cn')
