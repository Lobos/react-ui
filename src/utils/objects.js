'use strict';

import { substitute } from './strings';

export const deepEqual = require('./deepEqual');

export function isEmpty (obj) {
  // null and undefined are "empty"
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj === 'number' && isNaN(obj)) {
    return true;
  }

  if (obj.length !== undefined) {
    return obj.length === 0;
  }

  if (obj instanceof Date) {
    return false;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}

export function forEach (obj, fn, context) {
  Object.keys(obj).forEach((key) => fn.call(context, obj[key], key));
}

export function toTextValue (arr, textTpl='{text}', valueTpl='{id}') {
  if (!arr) {
    return [];
  }
  if (!Array.isArray(arr)) {
    arr = Object.keys(arr).map((key) => {
      return {
        id: key,
        text: arr[key]
      };
    });
  }
  arr = arr.map(function (s) {
    if (typeof s !== 'object') {
      s = s.toString();
      return { $text: s, $value: s, $key: hashcode(s) };
    } else {
      s.$text = substitute(textTpl, s);
      s.$value = substitute(valueTpl, s);
      s.$key = s.id ? s.id : hashcode(`${s.$text}-${s.$value}`);
      return s;
    }
  });
  return arr;
}

export function hashcode(obj) {
  let hash = 0, i, chr, len, str;

  let type = typeof obj;
  switch (type) {
      case 'object':
          //let newObj = {};
          //forEach(obj, (v, k) => v && (typeof v === 'object' || 'function') ? v.toString() : v);
          str = JSON.stringify(obj);
          break;
      case 'string':
          str = obj;
          break;
      default:
          str = obj.toString();
          break;
  }

  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(36);
}

export function sortByKey (obj) {
  if (!obj) {
    return {};
  }

  let newObj = {};
  Object.keys(obj).sort().forEach((key) => {
    newObj[key] = obj[key];
  });

  return newObj;
}

export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);

  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }

  for (let i = 0, key; i < keysA.length; i++) {
    key = keysA[i];
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
