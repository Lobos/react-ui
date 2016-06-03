export default class Page {
  constructor (props) {
    this.title = 'React ui docs'
  }

  open (path) {
    browser.url('http://localhost:3000/#/' + path)
  }

  pause (time = 3000) {
    browser.pause(time)
  }

  click (el) {
    switch (el.constructor) {
      case Object:
        el.click()
        break
      case String:
        browser.elementIdClick(el)
        break
    }
  }

  select (el) {
    const className = el.getAttribute('class')

    if (className.indexOf('checked') < 0) el.click()

    this.pause(1000)
  }

  cancelSelect (el) {
    const className = el.getAttribute('class')

    if (className.indexOf('checked') > 0) el.click()

    this.pause(1000)
  }

  assertClass (el, segment) {
    const className = el.getAttribute('class')

    expect(className).to.contains(segment)
  }

  assertSelectedValue (value) {
    const text = this.valuePreviewDiv.getText()

    expect(text).to.be.equal(value)
  }

  assertIsSelectAble (locator, ok) {
    const assert = expect(browser.isExisting(locator))

    ok ? assert.to.be.true : assert.to.be.false
  }

  assertIsDisabled (locator, ok) {
    const assert = expect(browser.isEnabled(locator))

    ok ? assert.to.be.true : assert.to.be.false
  }
}
