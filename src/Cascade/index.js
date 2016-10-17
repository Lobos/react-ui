import { compose } from '../utils/compose'
import FormItem from '../higherOrders/FormItem'
import Data from './Data'
import Cascade from './Cascade'
import Mult from './MultCascade'

export default compose(
  FormItem.register('cascade', {valueType: 'array'}),
  Data(false)
)(Cascade)

export const MultCascade = compose(
  FormItem.register('mult-cascade', {valueType: 'array'}),
  Data(true)
)(Mult)
