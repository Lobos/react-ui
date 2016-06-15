import Page from '../common/Page'
import * as Locator from './DatePickerPageLocator'

export default class TreePage extends Page {
  constructor (props) {
    super(props)
    this.locator = Locator
  }

  setUp () {
    super.open('datepicker')
    super.pause()
  }
}
