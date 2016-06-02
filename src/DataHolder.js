'use strict';

import { objectAssign } from './utils/objects';

export default class DataHolder {
  constructor (data, options) {
    this.data = data || [];
    this.options = objectAssign({}, options);
  }

  add (items) {
    if (!Array.isArray(items)) items = [items];

    let temp = [];
    items.forEach((d) => {
      if (this.data.indexOf(d) < 0) {
        temp.push(d);
      }
    });

    this.data = this.data.concat(temp);
  }

  remove (items) {
    if (!Array.isArray(items)) items = [items];

    this.data = this.data.filter((d) => {
      return items.indexOf(d) < 0;
    });
  }

  getValue (tpl) {
    console.log(tpl);
  }
}

