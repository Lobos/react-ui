"use strict"

export const Checkbox = require('./components/checkbox.jsx')
export const CheckboxGroup = require('./components/checkboxGroup.jsx')
export const Datetime = require('./components/datetime.jsx')
export const Grid = require('./components/grid.jsx')
export const Icon = require('./components/icon.jsx')
export const Input = require('./components/input.jsx')
export const RadioGroup = require('./components/radioGroup.jsx')
export const Rating = require('./components/rating.jsx')
export const Select = require('./components/select.jsx')
export const Tree = require('./components/tree.jsx')
export const Upload = require('./components/upload.jsx')
export const Button = require('./components/button.jsx')

export const FormControl = require('./components/formControl.jsx')
export const FormSubmit = require('./components/formSubmit.jsx')
export const Form = require('./components/form.jsx')

export const Pagination = require('./components/pagination.jsx')
export const Table = require('./components/table.jsx')
export const TableHeader = require('./components/tableHeader.jsx')
export const Filter = require('./components/filter.jsx')
export const Modal = require('./components/modal.jsx')
export const Message = require('./components/message.jsx')
export const Lang = require('./lang')

export const dataSource = require('./utils/dataSource')

export const Utils = {
  Datetime: require('./utils/datetime'),
  Dom: require('./utils/dom'),
  Objects: require('./utils/objects'),
  Strings: require('./utils/strings')
}

// ajax
export const Qwest = require('qwest')

// set language
//require('./lang/zh-cn')
