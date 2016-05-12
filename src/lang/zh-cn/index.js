'use strict';

import objectAssign from 'object-assign';

import buttons from './buttons';
import datetime from './datetime';
import fetch from './fetch';
import validation from './validation';

module.exports = objectAssign({}, buttons, datetime, fetch, validation);
