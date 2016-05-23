'use strict';

export function removeItem (arr, obj) {
  let index = arr.indexOf(obj);
  if (index >= 0) {
    arr.splice(index, 1);
  }
  return arr;
}
