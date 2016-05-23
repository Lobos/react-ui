'use strict';

import ReactDOM from 'react-dom';

import Form from '../../src/Form';
import '../../src/FormControl';
import '../../src/Input';
import '../../src/Datepicker';
import '../../src/Select';
import '../../src/RadioGroup';
import '../../src/Checkbox';
import '../../src/CheckboxGroup';
import '../../src/Rating';
import '../../src/Tree';
import '../../src/Upload';
import Modal from '../../src/Modal';
import '../../src/Textarea';
import { register } from '../../src/higherOrders/FormItem';

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
