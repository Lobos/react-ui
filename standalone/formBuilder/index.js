'use strict';

import ReactDOM from 'react-dom';
import FormBuilder from '../../src/addons/FormBuilder';

import { setTheme } from '../../src/themes/index';
setTheme();

ReactDOM.render(
  <FormBuilder />,
  document.getElementById('form')
);
