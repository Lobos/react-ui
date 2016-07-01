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

  get activeYear () {
    const {ELEMENT} = this.header.value

    return browser.elementIdElement(ELEMENT, locator.currentYear)
  }

  get activeMonth () {
    const {ELEMENT} = this.header.value

    return browser.elementIdElement(ELEMENT, locator.currentMonth)
  }

  get activeDay () {
    const {ELEMENT} = this.dayInner.value

    return browser.elementIdElement(ELEMENT, locator.currentDay)
  }

  get valuePreview () {
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElement(ELEMENT, locator.valuePreview)
  }

  get headerToggles () {
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElements(ELEMENT, locator.headerToggles).value.map((e) => {
      return e.ELEMENT
    })
  }

  get dayInner () {
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElement(ELEMENT, locator.dayInner)
  }

  get yearInner(){
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElement(ELEMENT, locator.yearInner)
  }

  get header () {
    const {ELEMENT} = this.datePickerToggle.value

    return browser.elementIdElement(ELEMENT, locator.header)
  }

  get yearBase () {
    const {ELEMENT} = this.yearInner.value

    return browser.elementIdElement(ELEMENT, locator.yearBase)
  }

  setUp () {
    super.open('datepicker')
    super.pause()
  }
}
