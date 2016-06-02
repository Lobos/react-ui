'use strict'

import Table from './Table'
import { compose } from '../utils/compose'
import { fetchable } from '../higherOrders/Fetch'
import { sortable } from '../higherOrders/Sort'
import { pagible } from '../higherOrders/Pagination'

export default compose(
  fetchable,
  sortable,
  pagible
)(Table)
