import { objectAssign } from '../../utils/objects'

import buttons from './buttons'
import datetime from './datetime'
import fetch from './fetch'
import modal from './modal'
import timeago from './timeago'
import validation from './validation'

module.exports = objectAssign({}, buttons, datetime, fetch, modal, timeago, validation)

