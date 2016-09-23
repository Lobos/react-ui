'use strict'

import { getLang } from '../lang'

export function clone (d) {
  return new Date(d.getTime())
}

export function addDays (d, days) {
  let newDate = clone(d)
  newDate.setDate(d.getDate() + days)
  return newDate
}

export function addMonths (d, months) {
  let newDate = clone(d)
  newDate.setMonth(d.getMonth() + months)
  return newDate
}

export function getFirstDayOfMonth (d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function getDaysInMonth (d) {
  let resultDate = getFirstDayOfMonth(d)

  resultDate.setMonth(resultDate.getMonth() + 1)
  resultDate.setDate(resultDate.getDate() - 1)

  return resultDate.getDate()
}

export function getFullMonth (d) {
  let month = d.getMonth()
  return getLang('datetime.fullMonth')[month]
}

export function getShortMonth (d) {
  let month = d.getMonth()
  return getLang('datetime.shortMonth')[month]
}

export function getDayOfWeek (d) {
  let weekday = d.getDay()
  return getLang('datetime.weekday')[weekday]
}

export function getWeekArray (d) {
  let dayArray = []
  let daysInMonth = getDaysInMonth(d)
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
}

export function isEqualDate (d1, d2) {
  if (!d1 || !d2 || !(d1 instanceof Date) || !(d2 instanceof Date)) {
    return false
  }

  return d1 && d2 &&
    (d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate())
}

export function isEqual (d1, d2) {
  if (!d1 || !d2 || !(d1 instanceof Date) || !(d2 instanceof Date)) {
    return false
  }

  return d1.getTime() === d2.getTime()
}

export function monthDiff (d1, d2) {
  let m
  m = (d1.getFullYear() - d2.getFullYear()) * 12
  m += d1.getMonth()
  m -= d2.getMonth()
  return m
}

export function format (date, fmt) {
  if (!date) { return '' }
  if (!(date instanceof Date)) {
    date = convert(date)
  }

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function getDatetime (d) {
  return format(d, getLang('datetime.format.datetime'))
}

export function getDate (d) {
  return format(d, getLang('datetime.format.date'))
}

export function getFullYear (d) {
  return format(d, getLang('datetime.format.year'))
}

export function getTime (d) {
  return format(d, getLang('datetime.format.time'))
}

// string, unixtimestamp convert to Date
export function convert (obj, def) {
  if (!obj) {
    return def
  }

  if (obj instanceof Date) {
    return obj
  }

  if (/^[-+]?[0-9]+$/.test(obj)) {
    obj = parseInt(obj)
  } else {
    obj = obj.replace(/-/g, '/')
  }

  if (/^\d?\d:\d?\d/.test(obj)) {
    obj = getDate(new Date()) + ' ' + obj
  }

  obj = new Date(obj)
  // Invalid Date
  if (isNaN(obj.getTime())) {
    obj = def
  }

  return obj
}
