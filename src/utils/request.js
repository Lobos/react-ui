'use strict';

//import Qwest from 'qwest';

const cache = {};

function ajax(options) {
  console.log(options);
}

function jsonp(options) {
  console.log(options);
}

export default function request({ type, ...opts }) {
  if (type === 'jsonp') {
    jsonp(opts);
  } else {
    ajax(opts);
  }
}
