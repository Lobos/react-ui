import { compose } from '../utils/compose'
import { Tree, setDefaultIcons } from './Tree'
import Fetch from '../higherOrders/Fetch'
import FormItem from '../higherOrders/FormItem'

function selectAble (Component) {
  return (props) => <Component {...props} selectAble={!!props.onChange} />
}

module.exports = compose(
  selectAble,
  FormItem.register('tree', { valueType: 'array' }),
  Fetch(false)
)(Tree)

module.exports.setDefaultIcons = setDefaultIcons

