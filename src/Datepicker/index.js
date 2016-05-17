'use strict';

import Datetime from './Datetime';
import { register } from '../higherOrders/FormItem';
import { compose } from '../utils/compose';
import pureRenderMixin from '../mixins/PureRender';

export default compose(
  register(['datetime', 'time', 'date'], {valueType: 'datetime'}),
  pureRenderMixin
)(Datetime);
