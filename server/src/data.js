'use strict'

module.exports = {
  Checkbox: {
    path: './components/checkbox.jsx',
    dependencies: [ 'FormControl' ]
  },

  CheckboxGroup: {
    path: './components/checkbox-group.jsx',
    dependencies: [ 'Checkbox', 'FormControl', 'Qwest' ]
  },

  Datetime: {
    path: './components/datetime.jsx',
    dependencies: [ 'FormControl', 'Lang' ]
  },

  Input: {
    path: './components/input.jsx',
    dependencies: [ 'FormControl' ]
  },

  RadioGroup: {
    path: './components/radio-group.jsx',
    dependencies: [ 'FormControl', 'Qwest' ]
  },

  Rating: {
    path: './components/rating.jsx',
    dependencies: [ 'FormControl' ]
  },

  Select: {
    path: './components/select.jsx',
    dependencies: [ 'FormControl', 'Qwest' ]
  },

  Tree: {
    path: './components/tree.jsx',
    dependencies: [ 'FormControl', 'Qwest' ]
  },

  FormControl: {
    path: './components/form-control.jsx'
  },

  FormSubmit: {
    path: './components/form-submit.jsx',
    dependencies: [ 'Button' ]
  },

  Form: {
    path: './components/form.jsx',
    dependencies: [ 'FormControl', 'Qwest' ]
  },

  Button: {
    path: './components/button.jsx'
  },

  Icon: {
    path: './components/icon.jsx'
  },

  Loading: {
    path: './components/loading.jsx'
  },

  Message: {
    path: './components/message.jsx'
  },

  Qwest: {
    path: 'qwest'
  },

  Lang: {
    path: './lang'
  },

  'zh-cn': {
    path: './lang/zh-cn',
    notExport: true,
    dependencies: [ 'Lang' ]
  }

}
