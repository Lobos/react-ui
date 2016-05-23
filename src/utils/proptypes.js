'use strict';

import { PropTypes } from 'react';

export const StringOrElement = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);

export const StringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export const ArrayOrObject = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
]);
