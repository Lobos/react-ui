'use strict';

/*
 * Come from https://github.com/webmodules/jsonp
 */

/**
 * Callback index.
 */

let count = 0;

/**
 * Noop function.
 */

function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

export default function (url, opts = {}, fn){
  if (typeof opts === 'function') {
    fn = opts;
    opts = {};
  }

  let id = opts.name || '__cb' + (new Date().getTime().toString() + (count++)).substr(-10);
  let param = opts.param || 'callback';
  let timeout = typeof opts.timeout === 'number' ? opts.timeout : 60000;
  let enc = encodeURIComponent;
  let target = document.getElementsByTagName('script')[0] || document.head;
  let script;
  let timer;

  function cleanup() {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
    window[id] = noop;
    if (timer) {
      clearTimeout(timer);
    }
  }

  function cancel() {
    if (window[id]) {
      cleanup();
    }
  }

  if (timeout) {
    timer = setTimeout(function() {
      cleanup();
      if (fn) {
        fn(new Error('timeout'));
      }
    }, timeout);
  }

  window[id] = function(data){
    cleanup();
    if (fn) {
      fn(null, data);
    }
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}
