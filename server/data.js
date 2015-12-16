'use strict';

module.exports = {
  Checkbox: {
    path: './Checkbox',
    dependencies: [ 'FormControl' ]
  },

  CheckboxGroup: {
    path: './CheckboxGroup',
    dependencies: [ 'Checkbox', 'FormControl' ]
  },

  Datetime: {
    path: './Datetime',
    dependencies: [ 'FormControl', 'Lang' ]
  },

  Input: {
    path: './Input',
    dependencies: [ 'FormControl' ]
  },

  RadioGroup: {
    path: './RadioGroup',
    dependencies: [ 'FormControl' ]
  },

  Rating: {
    path: './Rating',
    dependencies: [ 'FormControl' ]
  },

  Select: {
    path: './Select',
    dependencies: [ 'FormControl' ]
  },

  Tree: {
    path: './Tree',
    dependencies: [ 'FormControl' ]
  },

  Upload: {
    path: './Upload',
    dependencies: [ 'FormControl' ]
  },

  FormControl: {
    path: './FormControl'
  },

  FormSubmit: {
    path: './FormSubmit',
    dependencies: [ 'Button' ]
  },

  Form: {
    path: './Form',
    dependencies: [ 'FormControl' ]
  },

  Button: {
    path: './Button'
  },

  Icon: {
    path: './Icon'
  },

  Message: {
    path: './Message'
  },

  Modal: {
    path: './Modal',
    dependencies: [ 'Button' ]
  },

  Table: {
    path: './Table',
    dependencies: [ 'TableHeader' ]
  },

  TableHeader: {
    path: './TableHeader'
  },

  Pagination: {
    path: './Pagination'
  },

  Filter: {
    path: './Filter'
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
  }

};
