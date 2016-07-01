import Page from '../common/Page'
import * as locator from './TreeLocator'

export default class TreePage extends Page {
  constructor (props) {
    super(props)
  }

  get firstRootLabel () {
    return browser.element(locator.firstRootLabel)
  }

  get firstRootIcon () {
    return browser.element(locator.firstRootIcon)
  }

  get child212Label () {
    return browser.element(locator.child212Label)
  }

  get grand1121Label () {
    return browser.element(locator.grand1121Label)
  }

  get valuePreviewDiv () {
    return browser.element(locator.valuePreviewDiv)
  }

  get selectAbleToggle () {
    return browser.element(locator.selectAbleToggle)
  }

  get readOnlyToggle () {
    return browser.element(locator.readOnlyToggle)
  }

  get iconsToggle () {
    return browser.element(locator.iconsToggle)
  }

  get sepMarks () {
    const els = browser.elements(locator.sepMarks)

    return els.value.map(e => {
      return e.ELEMENT
    })
  }

  get captureModes () {
    const els = browser.elements(locator.captureModes)

    return els.value.map(e => {
      return e.ELEMENT
    })
  }

  setUp () {
    super.open('tree')
    super.pause()
  }
}
