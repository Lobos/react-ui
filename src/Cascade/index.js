import { compose } from '../utils/compose'
import FormItem from '../higherOrders/FormItem'
import Data from './Data'
import Cascade from './Cascade'

export default compose(
  FormItem.register('cascade', {valueType: 'array'}),
  Data
)(Cascade)
