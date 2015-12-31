'use strict';

import refetch from 'refetch';

module.exports = function (src, data, options) {
  let stacks = {
        'then': [],
        'catch': [],
        'complete': []
      },
      promises = ['then', 'catch', 'complete'],
      req = null,

  pinky = function () {
    req = refetch.get(src, data, options);
    promises.forEach((p) => {
      req[p]((res) => {
        stacks[p].forEach((func) => {
          func(res);
        });
      });
    });
    return pinky;
  };

  promises.forEach((p) => {
    pinky[p] = (func) => {
      stacks[p].push(func);
      return pinky;
    };
  });

  return pinky;
}
