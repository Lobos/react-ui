'use strict';

import qwest from 'qwest';
import md5 from 'md5';
import jsonp from './jsonp';

//const globalCache = {};

function getKey(url, data, method) {
  //let key = `${method}_${url}_${}`;
  console.log(md5(url));
  console.log(url, data, method);
}

function getItem(key) {
  console.log(key);
}

function setItem(key, data, expired) {
  console.log(key, data, expired);
}

export default function request({ type='ajax', cache=0, url, data, method='get', success, error, options }) {

  const key = getKey(url, data, method);
  console.log(getItem(key));
  setItem(data);

  if (type === 'ajax') {
    method = method.toLowerCase();
    qwest[method](url, data, options).then(success).catch(error);
  } else {
    jsonp(url, (err, res) => {
      if (err && typeof error === 'function') {
        error(err);
      } else if (success) {
        success(res);
      }
    });
  }
}
