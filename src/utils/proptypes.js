'use strict';

import { PropTypes } from 'react';

export const PropStringOrElement = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);

export const PropStringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);

export const PropArrayOrObject = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
]);

export const PropDatetime = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.object
]);
