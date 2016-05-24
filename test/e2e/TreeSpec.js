import TreePage from './po/TreePage'

const treePage = new TreePage()

describe('Tree e2e Testing', function () {
  beforeEach(() => {
    treePage.init()

    treePage.select(treePage.firstRootLable)

    treePage.cancelSelect(treePage.firstRootLable)
  })

  describe('Select', () => {
    it('should select Parent 1-1', () => {
      treePage.select(treePage.firstRootLable)

      treePage.assertSelectedValue('current value: 1,1.1,1.1.1,1.2,1.2.1,1.2.2,1.3,1.3.1,1.3.2')

      treePage.cancelSelect(treePage.firstRootLable)
    })

    it('should select Child 2 - 1.2', () => {
      treePage.select(treePage.child212Lable)

      treePage.assertSelectedValue('current value: 1.2,1.2.1,1.2.2')

      treePage.cancelSelect(treePage.child212Lable)
    })

    it('should select Grand 1 - 1.2.1', () => {
      treePage.select(treePage.grand1121Lable)

      treePage.assertSelectedValue('current value: 1.2.1')

      treePage.cancelSelect(treePage.grand1121Lable)
    })
  })

  describe('Label Status', function () {
    it('should apply right checked status', () => {
      treePage.select(treePage.grand1121Lable)

      treePage.assertSelectedStatus(treePage.grand1121Lable)

      treePage.assertindeterminateStatus(treePage.child212Lable)

      treePage.assertindeterminateStatus(treePage.firstRootLable)
    })
  })
})
