describe('e2e test for react-ui', () => {
  it('Demo', () => {
    browser.url('http://localhost:3000/#/tree')

    const title = browser.getTitle()

    expect(title).to.be.equal('React ui docs')
  })

  it('choose all', () => {
    browser.click('//div[@class="docs-example"]/ul/li/div/label')

    browser.pause(3000)

    const locator1 = '//div[@class="docs-example"]/div[1]'

    expect(browser.getText(locator1)).to.be.equal('current value: 1,1.1,1.1.1,1.2,1.2.1,1.2.2,1.3,1.3.1,1.3.2')
  })
})
