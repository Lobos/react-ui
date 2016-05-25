'use strict';

import { PropTypes } from 'react';
import oneOfType from 'one-of-type';

export default {
  ...PropTypes,

  ...oneOfType,

  datetime: oneOfType.number_object_string,

  grid: oneOfType.number_object,

  tpl: oneOfType.func_string
};
