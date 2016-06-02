const Regs = {
  'email': /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
  'number': /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))*\s*$/,
  'numeric': /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))*\s*$/,
  'alpha': /^[a-z ._-]+$/i,
  'alphanum': /^[a-z0-9_]+$/i,
  'alpha_numeric': /^[a-z0-9_]+$/i,
  'password': /^[\x00-\xff]+$/,
  'integer': /^[-+]?[0-9]*$/,
  'tel': /^[\d\s ().-]+$/,
  'hex': /^#[0-9a-f]{6}?$/i,
  'rgb': new RegExp('^rgb\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*\\)$'),
  'rgba': new RegExp('^rgba\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*((0.[1-9]*)|[01])\\s*\\)$'),
  'hsv': new RegExp('^hsv\\(\\s*(0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*\\)$')
}

// from https://github.com/guillaumepotier/Parsley.js/blob/master/src/parsley/validator_registry.js
Regs.url = new RegExp(
  '^' +
    // protocol identifier
    '(?:(?:https?|ftp)://)?' + // ** mod: make scheme optional
  // user:pass authentication
  '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    // '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +   // ** mod: allow local networks
    // '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +  // ** mod: allow local networks
    // '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +  // ** mod: allow local networks
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    ')' +
    // port number
    '(?::\\d{2,5})?' +
    // resource path
    '(?:/\\S*)?' +
    '$', 'i'
)

export default Regs
