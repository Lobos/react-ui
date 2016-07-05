'use strict'

import TimeAgo from './TimeAgo'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'
import PureRender from '../mixins/PureRender'

export default compose(
  FormItem.register(['timeago'], {valueType: 'timeago'}),
  PureRender()
)(TimeAgo)
