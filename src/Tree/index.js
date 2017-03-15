import { compose } from '../utils/compose'
import { Tree as component, setDefaultIcons } from './Tree'
import Fetch from '../higherOrders/Fetch'
import FormItem from '../higherOrders/FormItem'

function selectAble (Component) {
  return (props) => <Component {...props} selectAble={!!props.onChange} />
}

const Tree = compose(
  selectAble,
  FormItem.register('tree', { valueType: 'array' }),
  Fetch(false)
)(component)

Tree.setDefaultIcons = setDefaultIcons

export default Tree

