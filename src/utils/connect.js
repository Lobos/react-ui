'use strict';

export function connect () {
  let args = Array.prototype.slice.apply(arguments);
  return function (component) {
    let i = args.length;
    while(i--) {
      component = args[i](component);
    }
    return component;
  }
}
