import FormItem from '../../higherOrders/FormItem'
import { compose } from '../../utils/compose'
import Quill from 'quill'
import Editor from './Editor'
import Button from './Button'
import ImageBlot from './ImageBlot'

import 'quill/dist/quill.snow.css'


Quill.register(ImageBlot)

const Component = compose(
  FormItem.register('editor', {})
)(Editor)

Component.Button = Button

export default Component
