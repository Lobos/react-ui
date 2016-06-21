import Page from '../common/Page'
import * as locator from './DatePickerLocator'

export default class DatePickerPage extends Page {
  constructor (props) {
    super(props)
  }

  get datePickerToggle () {
    return browser.element(locator.datePickerToggle)
  }

  get datePickerPanel () {
    return browser.element(locator.datePickerPanel)
  }

  get timePickerToggle () {
    return browser.element(locator.timePickerToggle)
  }

  get timePickerPanel () {
    return browser.element(locator.timePickerPanel)
  }

  // date
  get activeYear () {
    return super.findOneByElement(this.header, locator.currentYear)
  }

  get activeMonth () {
    return super.findOneByElement(this.header, locator.currentMonth)
  }

  get activeDay () {
    return super.findOneByElement(this.dayInner, locator.currentDay)
  }

  get valuePreview () {
    return super.findOneByElement(this.datePickerToggle, locator.valuePreview)
  }

  get headerToggles () {
    return super.findMultByElement(this.datePickerToggle, locator.headerToggles)
  }

  get dayInner () {
    return super.findOneByElement(this.datePickerToggle, locator.dayInner)
  }

  get monthInner () {
    return super.findOneByElement(this.datePickerToggle, locator.monthInner)
  }

  get yearInner () {
    return super.findOneByElement(this.datePickerToggle, locator.yearInner)
  }

  get header () {
    return super.findOneByElement(this.datePickerToggle, locator.header)
  }

  get yearBase () {
    return super.findOneByElement(this.yearInner, locator.yearBase)
  }

  get january () {
    return super.findOneByElement(this.monthInner, locator.january)
  }

  // time
  get clockInner () {
    return super.findOneByElement(this.timePickerToggle, locator.clockInner)
  }

  get minMarks () {
    return super.findMultByElement(this.clockInner, locator.minMarks)
  }

  setUp () {
    super.open('datepicker')
    super.pause()
  }
}
