import TimeAgo from './TimeAgo'
import { compose } from '../utils/compose'
import PureRender from '../mixins/PureRender'

export default compose(
  PureRender()
)(TimeAgo)
