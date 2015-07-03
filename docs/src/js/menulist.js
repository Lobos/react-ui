"use strict"

module.exports = [
  { route: 'form', text: 'Form', handler: require('./pages/form.jsx') },
  { route: 'form-control', text: 'Form Control', handler: require('./pages/form-control.jsx') },
  { route: 'form-submit', text: 'Form Submit', handler: require('./pages/form-submit.jsx') },
  { route: 'checkbox', text: 'Checkbox', handler: require('./pages/checkbox.jsx') },
  { route: 'checkbox-group', text: 'Checkbox Group', handler: require('./pages/checkbox-group.jsx') },
  { route: 'datetime', text: 'Datetime', handler: require('./pages/datetime.jsx') },
  { route: 'input', text: 'Input', handler: require('./pages/input.jsx') },
  { route: 'radio-group', text: 'Radio Group', handler: require('./pages/radio-group.jsx') },
  { route: 'rating', text: 'Rating', handler: require('./pages/rating.jsx') },
  { route: 'select', text: 'Select', handler: require('./pages/select.jsx') },
  { route: 'tree', text: 'Tree', handler: require('./pages/tree.jsx') },
  { hr: true },
  { route: 'button', text: 'Button', handler: require('./pages/button.jsx') },
  { route: 'icon', text: 'Icon', handler: require('./pages/icon.jsx') },
  { route: 'lang', text: 'Lang', handler: require('./pages/lang.jsx') },
  { route: 'pagination', text: 'Pagination', handler: require('./pages/pagination.jsx') },
  { route: 'message', text: 'Message', handler: require('./pages/message.jsx') }
]
