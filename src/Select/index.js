import { compose } from '../utils/compose'
import Fetch from '../higherOrders/Fetch'
import FormItem from '../higherOrders/FormItem'
import ClickAway from '../higherOrders/ClickAway'
import Format from './format'
import Select from './Select'

export default compose(
  FormItem.register('select', {valueType: 'array'}),
  Fetch(false),
  Format,
  ClickAway
)(Select)

