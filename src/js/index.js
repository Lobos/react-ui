"use strict"

export const Checkbox = require('./components/Checkbox.jsx')
export const CheckboxGroup = require('./components/CheckboxGroup.jsx')
export const Datetime = require('./components/Datetime.jsx')
export const Grid = require('./components/Grid.jsx')
export const Icon = require('./components/Icon.jsx')
export const Input = require('./components/Input.jsx')
export const RadioGroup = require('./components/RadioGroup.jsx')
export const Rating = require('./components/Rating.jsx')
export const Select = require('./components/Select.jsx')
export const Tree = require('./components/Tree.jsx')
export const Button = require('./components/Button.jsx')

export const FormControl = require('./components/FormControl.jsx')
export const FormSubmit = require('./components/FormSubmit.jsx')
export const Form = require('./components/Form.jsx')

export const Pagination = require('./components/Pagination.jsx')
export const Table = require('./components/Table.jsx')
export const TableHeader = require('./components/TableHeader.jsx')
export const Filter = require('./components/Filter.jsx')

export const Message = require('./components/Message.jsx')
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
