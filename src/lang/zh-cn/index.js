'use strict';

import { objectAssign } from '../../utils/objects';

import buttons from './buttons';
import datetime from './datetime';
import fetch from './fetch';
import validation from './validation';

module.exports = objectAssign({}, buttons, datetime, fetch, validation);
