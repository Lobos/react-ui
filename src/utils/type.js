// https://github.com/component/type
/**
 * toString ref.
 */

let toString = Object.prototype.toString

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

export default function (val) {
  switch (toString.call(val)) {
    case '[object Date]': return 'date'
    case '[object RegExp]': return 'regexp'
    case '[object Arguments]': return 'arguments'
    case '[object Array]': return 'array'
    case '[object Error]': return 'error'
  }

  if (val === null) { return 'null' }
  if (val === undefined) { return 'undefined' }
  if (val && val.nodeType === 1) { return 'element' }

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val
}
