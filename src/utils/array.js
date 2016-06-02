'use strict'

export function removeItem (arr, obj) {
  let index = arr.indexOf(obj)
  if (index >= 0) {
    arr.splice(index, 1)
  }
  return arr
}

export function combine (arr, num) {
  let len = arr.length
  let list = []

  function _ (arr, start, result, count) {
    for (let i = start; i < len + 1 - count; i++) {
      result[count - 1] = i
      if (count - 1 === 0) {
        let sublist = []
        for (let j = num - 1; j >= 0; j--) {
          sublist.push(arr[result[j]])
        }
        list.push(sublist)
      } else {
        _(arr, i + 1, result, count - 1)
      }
    }
  }

  _(arr, 0, [], num, num)
  return list
}

export function perm (arr) {
  var result = []
  var fac = 1
  for (var i = 2; i <= arr.length; i++) {
    fac *= i
  }
  for (let index = 0; index < fac; index++) {
    var t = index
    for (let i = 1; i <= arr.length; i++) {
      var w = t % i
      for (let j = i - 1; j > w; j--) {
        result[j] = result[j - 1]
      }
      result[w] = arr[i - 1]
      t = Math.floor(t / i)
    }
  }
}
