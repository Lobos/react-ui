import Page from './Page'

export default class TreePage extends Page {
  get firstRootLable () {
    return browser.element('//div[@class="docs-example"]/ul/li[1]/div/label')
  }

  get child212Lable () {
    return browser.element('//div[@class="docs-example"]/ul/li[1]/ul[1]/li[2]/div/label')
  }

  get grand1121Lable () {
    return browser.element('//div[@class="docs-example"]/ul/li[1]/ul[1]/li[2]/ul[1]/li[1]/div/label')
  }

  get valuePreviewDiv () {
    return browser.element('//div[@class="docs-example"]/div[1]')
  }

  init () {
    Page.open('tree')
    Page.pause()
  }

  select (lable) {
    const className = lable.getAttribute('class')

    if (className.indexOf('checked') < 0) return lable.click()
  }

  cancelSelect (lable) {
    const className = lable.getAttribute('class')

    if (className.indexOf('checked') > 0) return lable.click()
  }

  assertSelectedValue (value) {
    const text = this.valuePreviewDiv.getText()

    expect(text).to.be.equal(value)
  }

  assertSelectedStatus (lable) {
    const className = lable.getAttribute('class')

    expect(className).to.contains('checked')
  }

  assertindeterminateStatus (lable) {
    const className = lable.getAttribute('class')

    expect(className).to.contains('indeterminate')
  }
}
