import Page from '../common/Page'
import * as Locator from './TreePageLocator'

export default class TreePage extends Page {
  get locator () {
    return Locator
  }

  get firstRootLabel () {
    return browser.element(Locator.firstRootLabel)
  }

  get child212Label () {
    return browser.element(Locator.child212Label)
  }

  get grand1121Label () {
    return browser.element(Locator.grand1121Label)
  }

  get valuePreviewDiv () {
    return browser.element(Locator.valuePreviewDiv)
  }

  get selectAbleToggle () {
    return browser.element(Locator.selectAbleToggle)
  }

  init () {
    Page.open('tree')
    Page.pause()
  }

  select (label) {
    const className = label.getAttribute('class')

    if (className.indexOf('checked') < 0) return label.click()
  }

  cancelSelect (label) {
    const className = label.getAttribute('class')

    if (className.indexOf('checked') > 0) return label.click()
  }

  assertSelectedValue (value) {
    const text = this.valuePreviewDiv.getText()

    expect(text).to.be.equal(value)
  }

  assertSelectedStatus (label) {
    const className = label.getAttribute('class')

    expect(className).to.contains('checked')
  }

  assertindeterminateStatus (label) {
    const className = label.getAttribute('class')

    expect(className).to.contains('indeterminate')
  }

  assertIsSelectAble (locator, ok) {
    const assert = expect(browser.isExisting(locator))

    ok ? assert.to.be.true : assert.to.be.false
  }
}
