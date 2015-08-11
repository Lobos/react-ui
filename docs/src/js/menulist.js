"use strict"

module.exports = [
  [
    { route: 'form', text: 'Form', handler: require('./pages/form.jsx') },
    { route: 'formControl', text: 'FormControl', handler: require('./pages/formControl.jsx') },
    { route: 'formSubmit', text: 'FormSubmit', handler: require('./pages/formSubmit.jsx') },
    { route: 'checkbox', text: 'Checkbox', handler: require('./pages/checkbox.jsx') },
    { route: 'checkboxGroup', text: 'CheckboxGroup', handler: require('./pages/checkboxGroup.jsx') },
    { route: 'datetime', text: 'Datetime', handler: require('./pages/datetime.jsx') },
    { route: 'input', text: 'Input', handler: require('./pages/input.jsx') },
    { route: 'radioGroup', text: 'RadioGroup', handler: require('./pages/radioGroup.jsx') },
    { route: 'rating', text: 'Rating', handler: require('./pages/rating.jsx') },
    { route: 'select', text: 'Select', handler: require('./pages/select.jsx') },
    { route: 'tree', text: 'Tree', handler: require('./pages/tree.jsx') }
  ],
  [
    { route: 'table', text: 'Table', handler: require('./pages/table.jsx') },
    { route: 'filter', text: 'Filter', handler: require('./pages/filter.jsx') },
    { route: 'button', text: 'Button', handler: require('./pages/button.jsx') },
    { route: 'icon', text: 'Icon', handler: require('./pages/icon.jsx') },
    { route: 'pagination', text: 'Pagination', handler: require('./pages/pagination.jsx') },
    { route: 'message', text: 'Message', handler: require('./pages/message.jsx') },
    { route: 'modal', text: 'Modal', handler: require('./pages/modal.jsx') },
    { route: 'dataSource', text: 'DataSource', handler: require('./pages/dataSource.jsx') },
    { route: 'lang', text: 'Lang', handler: require('./pages/lang.jsx') }
  ]
]
