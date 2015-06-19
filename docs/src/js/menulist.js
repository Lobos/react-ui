"use strict"

module.exports = [
  { route: 'checkbox', text: 'Checkbox', handler: require('./pages/checkbox.jsx') },
  { route: 'checkbox-group', text: 'Checkbox Group', handler: require('./pages/checkbox-group.jsx') },
  { route: 'radio-group', text: 'Radio Group', handler: require('./pages/radio-group.jsx') },
  { route: 'rating', text: 'Rating', handler: require('./pages/rating.jsx') },
  { route: 'tree', text: 'Tree', handler: require('./pages/tree.jsx') },
  { hr: true },
  { route: 'button', text: 'Button', handler: require('./pages/button.jsx') },
  { route: 'icon', text: 'Icon', handler: require('./pages/icon.jsx') },
  { route: 'lang', text: 'Lang', handler: require('./pages/lang.jsx') },
  { route: 'message', text: 'Message', handler: require('./pages/message.jsx') }
]
