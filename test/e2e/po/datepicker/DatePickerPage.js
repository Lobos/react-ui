import Page from '../common/Page'
import * as Locator from './DatePickerPageLocator'

export default class DatePickerPage extends Page {
  constructor (props) {
    super(props)
    this.locator = Locator
  }

  get datePickerToggle () {
    return browser.element(this.locator.datePickerToggle)
  }

  get datePickerPanel () {
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElement(ELEMENT, '.' + this.locator.datePickerPanel)
  }

  setUp () {
    super.open('datepicker')
    super.pause()
  }
}
