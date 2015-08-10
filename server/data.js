'use strict'

module.exports = {
  Checkbox: {
    path: './components/checkbox.jsx',
    dependencies: [ 'FormControl' ]
  },

  CheckboxGroup: {
    path: './components/checkboxGroup.jsx',
    dependencies: [ 'Checkbox', 'FormControl' ]
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
    path: './components/radioGroup.jsx',
    dependencies: [ 'FormControl' ]
  },

  Rating: {
    path: './components/rating.jsx',
    dependencies: [ 'FormControl' ]
  },

  Select: {
    path: './components/select.jsx',
    dependencies: [ 'FormControl' ]
  },

  Tree: {
    path: './components/tree.jsx',
    dependencies: [ 'FormControl' ]
  },

  FormControl: {
    path: './components/formControl.jsx'
  },

  FormSubmit: {
    path: './components/formSubmit.jsx',
    dependencies: [ 'Button' ]
  },

  Form: {
    path: './components/form.jsx',
    dependencies: [ 'FormControl' ]
  },

  Button: {
    path: './components/button.jsx'
  },

  Icon: {
    path: './components/icon.jsx'
  },

  Message: {
    path: './components/message.jsx'
  },

  Modal: {
    path: './components/modal.jsx',
    dependencies: [ 'Button' ]
  },

  Table: {
    path: './components/table.jsx',
    dependencies: [ 'TableHeader' ]
  },

  TableHeader: {
    path: './components/tableHeader.jsx'
  },

  Filter: {
    path: './components/filter.jsx'
  },

  Qwest: {
    path: 'qwest'
  },

  dataSource: {
    path: './utils/dataSource.js',
    dependencies: [ 'Qwest' ]
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
