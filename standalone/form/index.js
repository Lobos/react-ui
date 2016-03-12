'use strict';

import ReactDOM from 'react-dom';

import Form from '../../src/Form';
import FormControl from '../../src/FormControl';
import Input from '../../src/Input';
import Datepicker from '../../src/Datepicker';
import Select from '../../src/Select';
import RadioGroup from '../../src/RadioGroup';
import Checkbox from '../../src/Checkbox';
import CheckboxGroup from '../../src/CheckboxGroup';
import Rating from '../../src/Rating';
import Tree from '../../src/Tree';
import Upload from '../../src/Upload';
import Modal from '../../src/Modal';
import Textarea from '../../src/Textarea';
import { register } from '../../src/higherOrders/FormItem';

import { setTheme } from '../../src/themes/index';
setTheme();

module.exports = {
  render: (el, options) => {
    if (typeof el === 'string') {
      el = document.getElementById(el);
    }
    ReactDOM.render(<Form {...options} />, el);
  },

  alert: (text) => {
    Modal.alert(text);
  },

  register
};
