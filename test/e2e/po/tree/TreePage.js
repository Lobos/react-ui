import Page from '../common/Page'
import * as Locator from './TreePageLocator'

export default class TreePage extends Page {
  constructor (props) {
    super(props)
    this.locator = Locator
  }

  get firstRootLabel () {
    return browser.element(this.locator.firstRootLabel)
  }

  get firstRootIcon () {
    return browser.element(this.locator.firstRootIcon)
  }

  get child212Label () {
    return browser.element(this.locator.child212Label)
  }

  get grand1121Label () {
    return browser.element(this.locator.grand1121Label)
  }

  get valuePreviewDiv () {
    return browser.element(this.locator.valuePreviewDiv)
  }

  get selectAbleToggle () {
    return browser.element(this.locator.selectAbleToggle)
  }

  get readOnlyToggle () {
    return browser.element(this.locator.readOnlyToggle)
  }

  get iconsToggle () {
    return browser.element(this.locator.iconsToggle)
  }

  get sepMarks () {
    const els = browser.elements(this.locator.sepMarks)

    return els.value.map(e => {
      return e.ELEMENT
    })
  }

  setUp () {
    super.open('tree')
    super.pause()
  }
}
