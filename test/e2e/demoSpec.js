describe('what?', () => {
  it('searches for WebdriverIO', () => {
    browser.url('http://localhost:3000/#/tree')

    const title = browser.getTitle()

    expect(title).to.be.equal('React ui docs')

    console.log('we gonna do some e2e tests for table or tree !!')
  })
})
