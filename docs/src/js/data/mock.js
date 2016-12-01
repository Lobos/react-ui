'use strict'

export function createArray (count) {
  let obj = []
  while (count--) { obj.push(count.toString()) }
  return obj
}

export function createKeyValue (count) {
  let obj = {}
  while (count--) { obj[count.toString()] = 'item ' + count }
  return obj
}

export function createObjectArray (count) {
  let obj = []
  while (count--) { obj.push({ key: count, value: `item-${count}` }) }
  return obj
}
