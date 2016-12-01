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

  findOneByElement (base, locator) {
    if (!base || !base.value) return

    const {ELEMENT} = base.value

    return browser.elementIdElement(ELEMENT, locator)
  }

  findMultByElement (base, locator, callback) {
    if (!base || !base.value) return

    const {ELEMENT} = base.value

    return callback
      ? browser.elementIdElements(ELEMENT, locator).value.map(callback)
      : browser.elementIdElements(ELEMENT, locator).value.map((e) => {
        return e.ELEMENT
      })
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

  getText (el) {
    let text = ''

    switch (el.constructor) {
      case Object:
        text = el.getText()
        break
      case String:
        text = browser.elementIdText(el).value
    }

    return text
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

  assertText (el, text) {
    const target = el.getText()

    expect(target).to.equal(text)

    this.pause(1000)
  }

  assertSelectedValue (value) {
    const text = this.valuePreviewDiv.getText()

    expect(text).to.be.equal(value)

    this.pause(1000)
  }

  assertIsSelectAble (locator, ok) {
    const assert = expect(browser.isExisting(locator))

    ok ? assert.to.be.true : assert.to.be.false

    this.pause(1000)
  }

  assertIsDisabled (locator, ok) {
    const assert = expect(browser.isEnabled(locator))

    ok ? assert.to.be.true : assert.to.be.false

    this.pause(1000)
  }

  isVisible (locator) {
    return browser.isVisible(locator)
  }
}
