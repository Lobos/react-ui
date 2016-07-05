import DatePicker from './po/datepicker/DatePickerPage'

const datePicker = new DatePicker()

const monthMapping = {
  0: '一',
  1: '二',
  2: '三',
  3: '四',
  4: '五',
  5: '六',
  6: '七',
  7: '八',
  8: '九',
  9: '十',
  10: '十一',
  11: '十二'
}

const instant = new Date()

describe('DatePicker', () => {
  before(() => {
    datePicker.setUp()
  })

  // describe('Date', () => {
  //   beforeEach(() => {
  //     if (datePicker.isVisible(datePicker.datePickerPanel.selector)) return

  //     datePicker.click(datePicker.datePickerToggle)
  //     datePicker.pause()
  //   })

  //   it('display current date', () => {
  //     datePicker.assertText(datePicker.activeYear, `${instant.getFullYear()}年`)
  //     datePicker.assertText(datePicker.activeMonth, `${monthMapping[instant.getMonth()]}月`)
  //     datePicker.assertText(datePicker.activeDay, `${instant.getDate()}`)
  //   })

  //   it('set day by choose', () => {
  //     datePicker.click(datePicker.activeDay)
  //     datePicker.assertText(datePicker.valuePreview, `${instant.toLocaleDateString().replace('/', '-')}`)
  //   })

  //   it('set year & month by toggle', () => {
  //     const [lastYear, lastMonth, nextMonth, nextYear] = datePicker.headerToggles

  //     datePicker.click(lastYear)
  //     datePicker.assertText(datePicker.activeYear, `${instant.getFullYear() - 1}年`)

  //     datePicker.click(nextMonth)
  //     datePicker.assertText(datePicker.activeYear, `${instant.getFullYear()}年`)

  //     datePicker.click(lastMonth)
  //     datePicker.assertText(datePicker.activeMonth, `${monthMapping[instant.getMonth() - 1]}月`)

  //     datePicker.click(nextYear)
  //     datePicker.assertText(datePicker.activeMonth, `${monthMapping[instant.getMonth()]}月`)
  //   })

  //   it('set year & month by choose', () => {
  //     datePicker.click(datePicker.activeYear)

  //     datePicker.assertText(datePicker.yearBase, `${instant.getFullYear()}`)

  //     datePicker.click(datePicker.yearBase)

  //     datePicker.assertText(datePicker.activeYear, `${instant.getFullYear()}年`)

  //     datePicker.click(datePicker.january)

  //     datePicker.assertText(datePicker.activeMonth, `一月`)
  //   })
  // })

  describe('Time', () => {
    beforeEach(() => {
      if (datePicker.isVisible(datePicker.timePickerPanel.selector)) return

      datePicker.click(datePicker.timePickerToggle)
      datePicker.pause()
    })

    it('set sec & min & hour by toggle', () => {
      const minMarks = datePicker.minMarks

      console.log(datePicker.getText(minMarks[0]))
    })

    it('set sec & min & hour by choose')

    it('am & pm')
  })

  describe('Min & Max', () => {
  })
})
