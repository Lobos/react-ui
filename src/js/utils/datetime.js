"use strict"
// can't remeber where get this code...

let lang = require('../lang')

let datetime = {

  addDays: function(d, days) {
    let newDate = this.clone(d)
    newDate.setDate(d.getDate() + days)
    return newDate
  },

  addMonths: function(d, months) {
    let newDate = this.clone(d)
    newDate.setMonth(d.getMonth() + months)
    return newDate
  },

  clone: function(d) {
    return new Date(d.getTime())
  },

  getDaysInMonth: function(d) {
    let resultDate = this.getFirstDayOfMonth(d)

    resultDate.setMonth(resultDate.getMonth() + 1)
    resultDate.setDate(resultDate.getDate() - 1)

    return resultDate.getDate()
  },

  getFirstDayOfMonth: function(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1)
  },

  getFullMonth: function(d) {
    let month = d.getMonth()
    return lang.get('date.fullMonth')[month]
  },

  getShortMonth: function(d) {
    let month = d.getMonth()
    return lang.get('date.shortMonth')[month]
  },

  getDayOfWeek: function(d) {
    let weekday = d.getDay()
    return lang.get('date.weekday')[weekday]
  },

  getWeekArray: function(d) {
    let dayArray = []
    let daysInMonth = this.getDaysInMonth(d)
    let daysInWeek
    let emptyDays
    let firstDayOfWeek
    let week
    let weekArray = []

    for (let i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i))
    }

    while (dayArray.length) {
      firstDayOfWeek = dayArray[0].getDay()
      daysInWeek = 7 - firstDayOfWeek
      emptyDays = 7 - daysInWeek
      week = dayArray.splice(0, daysInWeek)

      for (let j = 0; j < emptyDays; j++) {
        week.unshift(null)
      }

      weekArray.push(week)
    }

    return weekArray
  },

  isEqualDate: function(d1, d2) {
    return d1 && d2 &&
      (d1.getFullYear() === d2.getFullYear()) &&
      (d1.getMonth() === d2.getMonth()) &&
      (d1.getDate() === d2.getDate())
  },

  isEqual: function (d1, d2) {
    if (!d1 || !d2 || !(d1 instanceof Date) || !(d2 instanceof Date)) {
      return false
    }

    return d1.getTime() === d2.getTime()
  },

  monthDiff: function(d1, d2) {
    let m
    m = (d1.getFullYear() - d2.getFullYear()) * 12
    m += d1.getMonth()
    m -= d2.getMonth()
    return m
  },

  format: function (date, fmt) {
    if (!date) { return '' }
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
    return fmt
  },

  getDatetime: function (d) {
    return datetime.format(d, lang.get('date.format.datetime'))
  },

  getDate: function (d) {
    return datetime.format(d, lang.get('date.format.date'))
  },

  getFullYear: function (d) {
    return datetime.format(d, lang.get('date.format.year'))
  },

  getTime: function (d) {
    return datetime.format(d, lang.get('date.format.time'))
  },

  // string, unixtimestamp convert to Date
  convert: function (obj, def) {
    if (def === undefined) {
      def = new Date()
    }

    if (!obj) {
      return def
    }

    if (obj instanceof Date) {
      return obj
    }

    if (/^[-+]?[0-9]+$/.test(obj)) {
      obj = parseInt(obj) * 1000
    }

    try {
      obj = new Date(obj)
    } catch (e) {
      console.warn(e)
      obj = def
    }
    return obj
  }

}

module.exports = datetime
