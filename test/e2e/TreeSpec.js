import TreePage from './po/TreePage'

const treePage = new TreePage()

beforeEach(() => {
  treePage.init()

  browser.pause(2000)
})

describe('e2e test for react-ui', () => {
  it('select all nodes of parent 1 - 1', () => {

    treePage.firstRootLable.click()

    expect(treePage.valuePreviewDiv.getText()).to.be.equal('current value: 1,1.1,1.1.1,1.2,1.2.1,1.2.2,1.3,1.3.1,1.3.2')
  })

  it('select all nodes of parent 2 - 2', () => {

    treePage.secondRootLable.click()

    expect(treePage.valuePreviewDiv.getText()).to.be.equal('current value: 1.2.2,2,2.1,2.2,2.2.1,2.2.2')
  })
})
