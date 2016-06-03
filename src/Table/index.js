'use strict'

import Table from './Table'
import { compose } from '../utils/compose'
import Fetch from '../higherOrders/Fetch'
import Sort from '../higherOrders/Sort'
import Pagination from '../higherOrders/Pagination'

export default compose(
  Fetch,
  Sort,
  Pagination
)(Table)
