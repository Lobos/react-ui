import Page from '../common/Page'
import * as locator from './TimePickerLocator'

export default class DatePickerPage extends Page {
  constructor (props) {
    super(props)
  }

  setUp () {
    super.open('datepicker')
    super.pause()
  }
}
