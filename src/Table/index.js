'use strict'

import Table from './Table'
import { compose } from '../utils/compose'
import Fetch from '../higherOrders/Fetch'
import Sort from '../higherOrders/Sort'
import Pagination from '../higherOrders/Pagination'
import Filter from '../higherOrders/Filter'

export default compose(
  Fetch(true),
  Filter,
  Sort,
  Pagination
)(Table)
