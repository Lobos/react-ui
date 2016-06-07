'use strict'

import Datetime from './Datetime'
import FormItem from '../higherOrders/FormItem'
import { compose } from '../utils/compose'
import pureRenderMixin from '../mixins/PureRender'

export default compose(
  FormItem.register(['datetime', 'time', 'date'], {valueType: 'datetime'}),
  pureRenderMixin
)(Datetime)
