import TreePage from './po/tree/TreePage'

const treePage = new TreePage()

describe('Tree e2e Testing', function () {
  beforeEach(() => {
    treePage.init()

    treePage.select(treePage.firstRootLabel)

    treePage.cancelSelect(treePage.firstRootLabel)
  })

  // describe('Select', () => {
  //   it('should select Parent 1-1', () => {
  //     treePage.select(treePage.firstRootLabel)

  //     treePage.assertSelectedValue('current value: 1,1.1,1.1.1,1.2,1.2.1,1.2.2,1.3,1.3.1,1.3.2')

  //     treePage.cancelSelect(treePage.firstRootLabel)
  //   })

  //   it('should select Child 2 - 1.2', () => {
  //     treePage.select(treePage.child212Label)

  //     treePage.assertSelectedValue('current value: 1.2,1.2.1,1.2.2')

  //     treePage.cancelSelect(treePage.child212Label)
  //   })

  //   it('should select Grand 1 - 1.2.1', () => {
  //     treePage.select(treePage.grand1121Label)

  //     treePage.assertSelectedValue('current value: 1.2.1')

  //     treePage.cancelSelect(treePage.grand1121Label)
  //   })
  // })

  describe('Status', function () {
    // it('should apply right checked status', () => {
    //   treePage.select(treePage.grand1121Label)

    //   treePage.assertSelectedStatus(treePage.grand1121Label)

    //   treePage.assertindeterminateStatus(treePage.child212Label)

    //   treePage.assertindeterminateStatus(treePage.firstRootLabel)
    // })

    // it('should apply right extend status', () => {
    // })

    it('should apply right selectAble status', () => {
      treePage.cancelSelect(treePage.selectAbleToggle)

      treePage.assertIsSelectAble(treePage.locator.firstRootLabel, false)

      treePage.assertIsSelectAble(treePage.locator.child212Label, false)

      treePage.assertIsSelectAble(treePage.locator.grand1121Label, false)

      treePage.select(treePage.selectAbleToggle)

      treePage.assertIsSelectAble(treePage.locator.firstRootLabel, true)

      treePage.assertIsSelectAble(treePage.locator.child212Label, true)

      treePage.assertIsSelectAble(treePage.locator.grand1121Label, true)
    })
  })

  describe('Feature', function () {
    // it('should be read only by readOnly prop', () => {
    // })

    // it('should apply right separator by sep prop', () => {
    // })

    // it('should apply right icons by icons prop', () => {
    // })

    // it('should be greedy by greedy prop', () => {
    // })
  })
})
