import TreePage from './po/tree/TreePage'

const treePage = new TreePage()

describe('Tree e2e Testing', function () {
  before(() => {
    treePage.setUp()
  })

  beforeEach(() => {
    treePage.select(treePage.firstRootLabel)

    treePage.cancelSelect(treePage.firstRootLabel)
  })

  describe('Select', () => {
    it('should select Parent 1-1', () => {
      treePage.select(treePage.firstRootLabel)

      treePage.assertSelectedValue('current value: 1,1.1,1.1.1,1.2,1.2.1,1.2.2,1.3,1.3.1,1.3.2')

      treePage.cancelSelect(treePage.firstRootLabel)
    })

    it('should select Child 2 - 1.2', () => {
      treePage.select(treePage.child212Label)

      treePage.assertSelectedValue('current value: 1.2,1.2.1,1.2.2')

      treePage.cancelSelect(treePage.child212Label)
    })

    it('should select Grand 1 - 1.2.1', () => {
      treePage.select(treePage.grand1121Label)

      treePage.assertSelectedValue('current value: 1.2.1')

      treePage.cancelSelect(treePage.grand1121Label)
    })
  })

  describe('Status', function () {
    it('should apply right checked status', () => {
      treePage.select(treePage.grand1121Label)

      treePage.assertClass(treePage.grand1121Label, 'checked')

      treePage.assertClass(treePage.child212Label, 'indeterminate')

      treePage.assertClass(treePage.firstRootLabel, 'indeterminate')
    })

    it('should apply right extend status', () => {
    })

    it('should apply right selectAble status', () => {
      const firstRootLabelLocator = treePage.firstRootLabel.selector
      const child212LabelLocator = treePage.child212Label.selector
      const grand1121LabelLocator = treePage.grand1121Label.selector

      treePage.cancelSelect(treePage.selectAbleToggle)

      treePage.assertIsSelectAble(firstRootLabelLocator, false)

      treePage.assertIsSelectAble(child212LabelLocator, false)

      treePage.assertIsSelectAble(grand1121LabelLocator, false)

      treePage.select(treePage.selectAbleToggle)

      treePage.assertIsSelectAble(firstRootLabelLocator, true)

      treePage.assertIsSelectAble(child212LabelLocator, true)

      treePage.assertIsSelectAble(grand1121LabelLocator, true)
    })
  })

  describe('Feature', function () {
    it('should be read only by readOnly prop', () => {
      const firstRootLabelLocator = treePage.firstRootLabel.selector

      treePage.select(treePage.readOnlyToggle)
      treePage.assertIsDisabled(`${firstRootLabelLocator}/input[1]`, false)

      treePage.cancelSelect(treePage.readOnlyToggle)
      treePage.assertIsDisabled(`${firstRootLabelLocator}/input[1]`, true)
    })

    it('should apply right separator by sep prop', () => {
      treePage.select(treePage.firstRootLabel)

      treePage.click(treePage.sepMarks[1])

      treePage.assertSelectedValue('current value: 1|1.1|1.1.1|1.2|1.2.1|1.2.2|1.3|1.3.1|1.3.2')
    })

    it('should apply right icons by icons prop', () => {
      treePage.select(treePage.iconsToggle)

      treePage.assertClass(treePage.firstRootIcon, 'icon-accounts')
    })

    it('should be greedy by greedy prop')
  })
})
