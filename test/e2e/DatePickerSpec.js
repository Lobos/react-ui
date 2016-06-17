import DatePicker from './po/datepicker/DatePickerPage'

const datePicker = new DatePicker()

describe('DatePicker', () => {
  before(() => {
    datePicker.setUp()
  })

  describe('Date', () => {
    it('display current date', function (done) {
      datePicker.click(datePicker.datePickerToggle)
      datePicker.pause()
    })
  })

  describe('Time', () => {
  })

  describe('Min & Max', () => {
  })
})
