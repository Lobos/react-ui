"use strict"

module.exports = [
  [
    { route: 'form', text: 'Form', handler: require('./pages/form.jsx') },
    { route: 'formControl', text: 'Form Control', handler: require('./pages/formControl.jsx') },
    { route: 'formSubmit', text: 'Form Submit', handler: require('./pages/formSubmit.jsx') },
    { route: 'checkbox', text: 'Checkbox', handler: require('./pages/checkbox.jsx') },
    { route: 'checkboxGroup', text: 'Checkbox Group', handler: require('./pages/checkboxGroup.jsx') },
    { route: 'datetime', text: 'Datetime', handler: require('./pages/datetime.jsx') },
    { route: 'input', text: 'Input', handler: require('./pages/input.jsx') },
    { route: 'radioGroup', text: 'Radio Group', handler: require('./pages/radioGroup.jsx') },
    { route: 'rating', text: 'Rating', handler: require('./pages/rating.jsx') },
    { route: 'select', text: 'Select', handler: require('./pages/select.jsx') },
    { route: 'tree', text: 'Tree', handler: require('./pages/tree.jsx') }
  ],
  [
    { route: 'button', text: 'Button', handler: require('./pages/button.jsx') },
    { route: 'icon', text: 'Icon', handler: require('./pages/icon.jsx') },
    { route: 'lang', text: 'Lang', handler: require('./pages/lang.jsx') },
    { route: 'pagination', text: 'Pagination', handler: require('./pages/pagination.jsx') },
    { route: 'message', text: 'Message', handler: require('./pages/message.jsx') },
    { route: 'dataSource', text: 'DataSource', handler: require('./pages/dataSource.jsx') }
  ]
]
